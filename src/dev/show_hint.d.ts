import type {PictogramKind} from '@/components/element_pictogram.vue'

declare global {
  interface Window {
    showHint?: (kind: PictogramKind, x: number, y: number, text: string) => void // Development only, set while a chamber is open: shows a hint about that kind of element over tile (x, y), y counted from the bottom row
  }
}
