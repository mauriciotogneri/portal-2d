#!/usr/bin/env bash

# Evens out the loudness of every MP3 under src/assets/audio/, so the game
# plays all sound effects at one volume and all music at another
# (src/game/sound.ts and src/game/music.ts). Each file is measured with
# ffmpeg (integrated loudness, EBU R128) and its gain changed with mp3gain,
# which rewrites no audio, so nothing is lost, but only in steps of 1.5 dB:
# each file lands within about 0.8 dB of its target. Run it again after adding
# or replacing a file; a file already even is left alone. Needs ffmpeg and
# mp3gain (sudo apt install ffmpeg mp3gain).

set -euo pipefail

cd "$(dirname "$0")/.."

# Loudness every file is evened to, in LUFS: the loudest no effect has to be pushed past its peak to reach
TARGET=-24

# Gain of one mp3gain step, in dB (2^(1/4) in amplitude)
STEP=1.505

# How far from its target a file may be, in dB, and still count as even: over half a step plus the
# measure's rounding, so a file a step just moved is never moved back by the next run
TOLERANCE=0.9

# Loudness ffmpeg reports when it measured nothing, in LUFS
UNMEASURED=-70

# By-ear adjustments, in dB from the target, for a file that sounds too loud or too quiet even at
# the target, each with why: [sound/name.mp3]=-1.5 # Heard on every slide
declare -A ADJUSTMENTS=(
)

# Prints a file's integrated loudness and its true peak, in that order, played the given number of extra times
measure_played() {
  local file=$1
  local loops=$2
  ffmpeg -hide_banner -nostats -stream_loop "$loops" -i "$file" -af ebur128=peak=true -f null - 2>&1 \
    | awk '/Summary:/ { summary = 1 } summary && $1 == "I:" { loudness = $2 } summary && $1 == "Peak:" { peak = $2 } END { print loudness, peak }'
}

# Prints a file's integrated loudness and its true peak, in that order. The loudness measure needs
# 0.4 s of sound, so a clip it finds nothing in is looped to about 2 s and measured again
measure() {
  local file=$1
  local result
  local duration
  local loops
  result=$(measure_played "$file" 0)
  if awk -v loudness="${result%% *}" -v unmeasured="$UNMEASURED" 'BEGIN { exit !(loudness <= unmeasured) }'; then
    duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$file")
    loops=$(awk -v duration="$duration" 'BEGIN { print int(2 / duration) + 1 }')
    result=$(measure_played "$file" "$loops")
  fi
  echo "$result"
}

unmeasured_files=0
for file in src/assets/audio/music/*.mp3 src/assets/audio/sound/*.mp3; do
  name=${file#src/assets/audio/}
  adjustment=${ADJUSTMENTS[$name]:-0}
  read -r loudness peak < <(measure "$file")
  if awk -v loudness="$loudness" -v unmeasured="$UNMEASURED" 'BEGIN { exit !(loudness == "" || loudness <= unmeasured) }'; then
    printf '%-26s could not be measured, left as it is\n' "$name"
    unmeasured_files=$((unmeasured_files + 1))
    continue
  fi

  steps=$(awk -v target="$TARGET" -v adjustment="$adjustment" -v loudness="$loudness" -v step="$STEP" -v tolerance="$TOLERANCE" \
    'BEGIN { off = target + adjustment - loudness; x = off / step; print (off <= tolerance && off >= -tolerance) ? 0 : (x < 0) ? -int(-x + 0.5) : int(x + 0.5) }')
  if [ "$steps" -eq 0 ]; then
    printf '%-26s %6s LUFS  even\n' "$name" "$loudness"
    continue
  fi

  new_peak=$(awk -v peak="$peak" -v steps="$steps" -v step="$STEP" 'BEGIN { printf "%.1f", peak + steps * step }')
  mp3gain -q -c -s s -g "$steps" "$file" > /dev/null
  printf '%-26s %6s LUFS  %+d steps\n' "$name" "$loudness" "$steps"
  if awk -v peak="$new_peak" 'BEGIN { exit !(peak > 0) }'; then
    printf '  warning: its peak is now %s dB, over full scale, so it may clip\n' "$new_peak"
  fi
done

if [ "$unmeasured_files" -gt 0 ]; then
  exit 1
fi
