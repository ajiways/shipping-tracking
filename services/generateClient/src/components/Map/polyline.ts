export const lineSymbol = {
  path: google.maps.SymbolPath.CIRCLE,
  scale: 8,
  strokeColor: randomColor(),
  strokeWidth: '#bcdbf8'
};

export const CarSymbol = {
  path: 10,
  scale: 10,
  strokeColor: randomColor(),
  strokeWidth: '#bcdbf8'
};

export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
