import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Board } from "../components/Board";
import type { SquareValue } from "../lib/game";

interface GameSearch {
  move: number;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): GameSearch => ({
    move: Number(search.move ?? 0),
  }),
  component: Game,
});

function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const { move } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const currentMove = Math.min(move, history.length - 1);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    navigate({ search: { move: nextHistory.length - 1 } });
  }

  function jumpTo(m: number) {
    navigate({ search: { move: m } });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center gap-8 pt-16">
      <h1 className="text-2xl font-bold text-slate-800">Tic-Tac-Toe</h1>
      <div className="flex gap-12">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <ol className="flex flex-col gap-1">
          {history.map((_, m) => (
            <li key={m}>
              <button
                onClick={() => jumpTo(m)}
                className={`px-3 py-1 rounded text-sm border
                  ${m === currentMove
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"}`}
              >
                {m === 0 ? "Về đầu ván" : `Nước đi #${m}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}