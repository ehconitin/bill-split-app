interface MemberTotal {
  [key: string]: { memberId: string; totalAmount: number };
}

export function settleBalances(memberTotal: MemberTotal) {
  const balances: Record<string, number> = {};

  // Calculate net balance for each member
  for (const memberName in memberTotal) {
    const { memberId, totalAmount } = memberTotal[memberName];
    balances[memberId] = totalAmount;
  }

  const sortedBalances = Object.entries(balances).sort((a, b) => a[1] - b[1]);

  const settlements: Array<{
    from: { memberId: string; memberName: string };
    to: { memberId: string; memberName: string };
    amount: number;
  }> = [];

  let i = 0;
  let j = sortedBalances.length - 1;

  while (i < j) {
    const [fromId, fromBalance] = sortedBalances[i];
    const [toId, toBalance] = sortedBalances[j];

    const amount = Math.min(Math.abs(fromBalance), Math.abs(toBalance));

    // Correct the memberName access
    const fromMemberName = Object.keys(memberTotal).find(
      (key) => memberTotal[key].memberId === fromId
    )!;
    const toMemberName = Object.keys(memberTotal).find(
      (key) => memberTotal[key].memberId === toId
    )!;

    settlements.push({
      from: { memberId: fromId, memberName: fromMemberName },
      to: { memberId: toId, memberName: toMemberName },
      amount: amount,
    });

    balances[fromId] += amount;
    balances[toId] -= amount;

    if (balances[fromId] === 0) {
      i++;
    }

    if (balances[toId] === 0) {
      j--;
    }
  }

  return settlements;
}
