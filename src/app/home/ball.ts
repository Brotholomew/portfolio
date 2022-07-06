export interface ball {
  color: string,
  scale: number,
  size: number,
  animationConfig: {
    value: string,
    params: {
      speed: number,
      toX: number,
      toY: number,
      froX: number,
      froY: number,
    }
  }
}
