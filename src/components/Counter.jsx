import '../styles/counter.css';

const Counter = ({ value, setValue, size="" }) => {

  
  return (
    <div className={`counter-box ${size}`}>
      <button
        className="bg-primary"
        onClick={() => setValue(value - 1)}
        disabled={value === 1}
      >
        <span className="material-symbols-outlined">
          remove
        </span>
      </button>
      <div className="value-box bg-dark">
        {value}
      </div>
      <button
        className="bg-primary"
        onClick={() => setValue(value + 1)}
      >
        <span className="material-symbols-outlined">
          add
        </span>
      </button>
    </div>
  )
}

export default Counter