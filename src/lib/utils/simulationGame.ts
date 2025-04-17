import { Knight } from "@/types";

export const simulationGame = (): { winner: Knight; log: string[] } => {
  const knights: Knight[] = Array.from({ length: 6 }, (_, i) => ({
    name: `Knight ${i + 1}`,
    health: 100,
    isAlive: true,
  }));

  const log: string[] = [];

  while (knights.filter((knight) => knight.isAlive).length > 1) {
    for (let i = 0; i < knights.length; i++) {
      const attacker = knights[i];

      if (!attacker.isAlive) continue;

      const targetIndex = getNextAlive(knights, i);
      const target = knights[targetIndex];

      const damage = getDamage();
      target.health -= damage;

      log.push(
        `${attacker.name} hits ${target.name} by ${damage} damage points`
      );

      if (target.health < 1 && target.isAlive) {
        target.isAlive = false;
        log.push(`${target.name} is dead`);
      }

      if (knights.filter((knight) => knight.isAlive).length === 1) break;
    }
  }

  const winner = knights.find((knight) => knight.isAlive)!;
  log.push(`${winner.name} wins the game`);

  return { winner, log };
};

export const getDamage = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const getNextAlive = (
  knights: Knight[],
  currentIndex: number
): number => {
  let index = (currentIndex + 1) % knights.length;

  while (!knights[index].isAlive) {
    index = (index + 1) % knights.length;
  }

  return index;
};
