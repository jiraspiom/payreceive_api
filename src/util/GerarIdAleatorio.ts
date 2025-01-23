export function GearIdAleatorio(): string {
  return Math.random().toString(16).substring(2, 24)
}
