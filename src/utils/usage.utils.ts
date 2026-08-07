export const formatTokenUsage = (tokensUsed: number, tokensLimit: number): string =>
  `${tokensUsed} / ${tokensLimit}`;

export const formatTokensRemaining = (tokensUsed: number, tokensLimit: number): number =>
  Math.max(tokensLimit - tokensUsed, 0);
