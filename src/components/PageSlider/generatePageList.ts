export default function generatePagesList(
  totalPages: number,
  currPage: number,
  range: number = 5
) {
  const numbersOfPages: number[] = [];
  numbersOfPages.push(currPage);
  for (let i = 1; i < range; i += 1) {
    const leftNeighbor = currPage - i;
    const rightNeighbor = currPage + i;
    if (leftNeighbor > 0 && numbersOfPages.length <= range) {
      numbersOfPages.push(leftNeighbor);
    }
    if (totalPages >= rightNeighbor && numbersOfPages.length <= range) {
      numbersOfPages.push(rightNeighbor);
    }
  }
  return numbersOfPages.sort((a, b) => a - b);
}
