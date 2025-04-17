"use client";

import { simulationGame } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [winner, setWinner] = useState<string>("");

  useEffect(() => {
    const { winner, log } = simulationGame();
    setLogs(log);
    setWinner(winner.name);
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "monospace" }}>
      <h1>Game of Knights</h1>
      <h2>Winner: {winner}</h2>
      <pre>
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </pre>
    </div>
  );
}
