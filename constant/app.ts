export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export enum FONT_SUPPORT {
  FontFastHand = '--font-font-local',
}

export enum ANIMATION {
  Rotate = 'animation__rotate',
  ZoomIn = 'animation__zoomIn',
  TransformYTop = 'animation__transformYTop',
  TransformXLeft = 'animation__transformXLeft',
  TransformXRight = 'animation__transformXRight',
  Flicker = 'animation__flicker',
}


export const IS_BROWSER = typeof window !== 'undefined';