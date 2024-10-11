const Square = ({ row, col, isVisited, isLastMove, isLegal, onClick }) => {
  const squareClass = `square ${isVisited ? 'isVisited' : ''}${isLegal ? ' isLegal' : ''}`;

  return (
    <div
      key={`${row}-${col}`}
      className={squareClass}
      onClick={() => onClick(row, col)}
      data-row={row}
      data-col={col}
    >
      {isLastMove && <div className="knight">&#9822;</div>}
      {/* {row},{col}   Optional: Comment out if not needed  */}
    </div>
  );
};

export default Square;
