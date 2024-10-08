const BoardForm = ({ rows, cols, disabled, handleBackClick, handleResetClick, onChangeRows, onChangeCols }) => {

  return (
    <form className="flex text-zinc-200 text-xs md:text-sm flex-col space-y-4">
      <label htmlFor="rows">Rows:</label>
      <input
        type="number"
        id="rows"
        value={rows}
        onChange={onChangeRows}
        min="1"
        className="p-2 text-black"
      />
      <label className="text-zinc-200" htmlFor="cols">Columns:</label>
      <input
        type="number"
        id="cols"
        value={cols}
        onChange={onChangeCols}
        min="1"
        className="p-2 text-black"
      />
      <div className="flex space-x-3 text-sm justify-center">
        <button type="button" disabled={disabled} onClick={handleBackClick}>
          Back
        </button>
        <button type="button" disabled={disabled} onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </form >
  );
};

export default BoardForm;
