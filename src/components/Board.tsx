import { Square } from "./Square";
import { calculateWinner, isBoardFull, type SquareValue } from "../lib/game";

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const { winner, line } = calculateWinner(squares);
  const draw = !winner && isBoardFull(squares);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    onPlay(next);
  }

  const status = winner
    ? `Người thắng: ${winner}`
    : draw
    ? "Hòa!"
    : `Lượt tiếp theo: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`text-lg font-semibold px-4 py-1 rounded-full
          ${winner ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
      >
        {status}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            isWinning={line?.includes(i) ?? false}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  );
}