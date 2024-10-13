type Move = { row: number, column: number }
type Route = Move[]

interface SquareProps {
  row: number
  col: number
  route: Route
  onClick: (row: number, column: number) => void
}

export default function Square({ row, col, route, onClick }: SquareProps) {
  const isLegalMove = (row: number, col: number) => {
    const lastMove = route[route.length - 1]
    if (lastMove === undefined) { return true }

    const prevRow = lastMove?.row
    const prevCol = lastMove?.column
    // Determine potential moves from last move of route
    const potentialMoves = [
      [prevRow + 2, prevCol + 1],
      [prevRow + 2, prevCol - 1],
      [prevRow - 2, prevCol + 1],
      [prevRow - 2, prevCol - 1],
      [prevRow + 1, prevCol + 2],
      [prevRow + 1, prevCol - 2],
      [prevRow - 1, prevCol + 2],
      [prevRow - 1, prevCol - 2],
    ];

    // Check if new square is within knight moves
    if (
      !potentialMoves.some((move) => move[0] === row && move[1] === col)
    ) {
      return false
    };

    // Check if square has already been visited
    return !route.some(
      (prevSquare: Move) => prevSquare.row === row && prevSquare.column === col
    );
  };
  const isLegal = isLegalMove(row, col);
  const isVisited = route.some((prevSquare) => prevSquare.row === row && prevSquare.column === col);
  const isLastMove = route.length > 0 && route[route.length - 1]?.row === row && route[route.length - 1]?.column === col;

  const squareClass = `square ${isVisited ? 'isVisited' : ''}${isLegal ? ' isLegal' : ''}`;
  return (
    <div
      key={`${row}-${col}`}
      className={squareClass}
      onClick={isLegal ? () => onClick(row, col) : undefined}
      data-row={row}
      data-col={col}
    >
      {isLastMove && <div className="knight">&#9822;</div>}
    </div>
  );
};

