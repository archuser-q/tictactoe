export type SquareValue = "X" | "O" | null;

export interface WinnerResult {
  winner: SquareValue;
  line: number[] | null;
}

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function calculateWinner(squares: SquareValue[]): WinnerResult {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

export function isBoardFull(squares: SquareValue[]): boolean {
  return squares.every((s) => s !== null);
}