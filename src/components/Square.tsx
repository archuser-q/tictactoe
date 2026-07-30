import type { SquareValue } from "../lib/game";

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
}

export function Square({ value, onClick, isWinning }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className={`h-20 w-20 text-4xl font-bold border border-slate-300 flex items-center justify-center transition-colors
        ${isWinning ? "bg-emerald-200 text-emerald-800" : "bg-white hover:bg-slate-50"}
        ${value === "X" ? "text-sky-600" : "text-rose-500"}`}
    >
      {value}
    </button>
  );
}