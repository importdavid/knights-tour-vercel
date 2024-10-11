import React, { useState } from 'react';
import Square from './Square';
import BoardForm from './BoardForm';

type Move = [number, number]

const Board = () => {
  const [rows, setRows] = useState(8); // Initial state for rows
  const [cols, setCols] = useState(8); // Initial state for columns
  // const [route, setRoute] = useState([]); // State for route (now stores coordinates)

  const [currentMove, setCurrentMove] = useState<{ row: number; column: number }>({
    row: 0,
    column: 0,
  });

  const handleSquareClick = (row: number, column: number) => {
    const newRoute = [...route]; // Copy of route
    if (isLegalMove(row, column, route)) {
      setCurrentMove({ row, column });
      newRoute.push([row, column]);
    }
  };

  const [route, setRoute] = useState<Move[]>([]); // State for storing moves

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value)); // Update rows on input change
    setRoute([]); // Reset route to empty on form change
  };

  const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCols(parseInt(event.target.value)); // Update cols on input change
    setRoute([]); // Reset route to empty on form change
  };

  const isLegalMove = (row: Number, col: Number, prevRoute: any) => {
    // All moves legal if no previous moves
    if (prevRoute.length === 0) { return true }

    // Determine potential moves from last move of route
    const [prevRow, prevCol] = prevRoute[prevRoute.length - 1]
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
    return !prevRoute.some(
      (prevSquare: any) => prevSquare[0] === row && prevSquare[1] === col
    );
  };

  const handleBackClick = () => {
    if (route.length > 0) {
      // Update route state using spread operator and slice
      setRoute((prevRoute) => prevRoute.slice(0, prevRoute.length - 1));
    }
  };

  const handleResetClick = () => {
    if (route.length > 0) {
      setRoute([]);
    }
  };

  const squares = Array(rows) // Generate rows
    .fill(null)
    .map((_, rowIndex) =>
      Array(cols) // Generate columns within each row
        .fill(null)
        .map((_, colIndex) => {
          const row = rows - rowIndex;
          const col = colIndex + 1;
          const isVisited = route.some(
            (prevSquare) => prevSquare[0] === row && prevSquare[1] === col
          );
          const isLastMove = row === currentMove.row && col === currentMove.column && route.length > 0

          // const isLastMove = (route.length > 0 && route[route.length - 1][0] === row && route[route.length - 1][1] === col) || false;
          const isLegal = isLegalMove(row, col, route);

          return (
            <Square
              key={`${row}-${col}`}
              row={row}
              col={col}
              isVisited={isVisited}
              isLastMove={isLastMove}
              isLegal={isLegal}
              onClick={handleSquareClick}
            />
          );
        })
    );

  return (
    <div className="w-full flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
      <div className="flex space-x-4 lg:space-x-0 p-4 w-full h-1/3 lg:h-full lg:flex-col lg:w-2/5">
        <div className="flex flex-col w-full h-full justify-start items-start">
          <BoardForm
            rows={rows}
            cols={cols}
            onChangeRows={handleRowChange}
            onChangeCols={handleColChange}
            disabled={route.length === 0}
            handleBackClick={handleBackClick}
            handleResetClick={handleResetClick}
          />
        </div>

        <div className="h-full w-full flex flex-col items-start text-xs lg:text-xl">
          <h1>Route:</h1>
          <div>
            {route.length > 0 ? <p>{JSON.stringify(route)}</p> : <p>Choose a starting square!</p>}
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-3/5 flex-col justify-center items-center">
        <div className="board w-full sm:w-4/5 h-fit p-6 min-w-0" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {squares.map((row, rowIndex) => (
            row.map((square, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`} // Combine row and col index for unique key
                className="grid-square"
                style={{
                  gridColumnStart: colIndex + 1, // Grid column position (starts from 1)
                  gridColumnEnd: colIndex + 2, // Grid column span (width of 1 square)
                  gridRowStart: rowIndex + 1, // Grid row position (starts from 1)
                  gridRowEnd: rowIndex + 2, // Grid row span (height of 1 square)
                }}
              >
                {square}
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
