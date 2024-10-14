interface FormProps {
  rows: number
  cols: number
  disabled: boolean
  handleBackClick: () => void
  handleResetClick: () => void
  onChangeRows: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeCols: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function BoardForm({ rows, cols, disabled, handleBackClick, handleResetClick, onChangeRows, onChangeCols }: FormProps) {

  return (
    <form className="flex text-zinc-200 text-xs md:text-sm flex-col space-y-4">
      <label htmlFor="rows">Rows:</label>
      <input
        type="number"
        id="rows"
        value={rows}
        onClick={(e) => e.currentTarget.select()}
        onChange={onChangeRows}
        min="1"
        className="p-2 text-black"
      />
      <label className="text-zinc-200" htmlFor="cols">Columns:</label>
      <input
        type="number"
        id="cols"
        value={cols}
        onClick={(e) => e.currentTarget.select()}
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
