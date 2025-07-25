import { useState, useRef, useEffect } from "react";

function FilterTips() {
  const [open, setOpen] = useState(false);
  const popRef = useRef(null);

  // close when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // close when you press the escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="filter-tips" ref={popRef}>
      <button
        type="button"
        className="filter-tips-btn"
        title="Filter Tips"
        onClick={() => setOpen((o) => !o)}
      >
        ℹ️
      </button>
      {open && (
        <div className="filter-tips-pop">
          <h4>Filter Tips</h4>
          <ul>
            <li>
              Start filtering by <strong>Type</strong> (the different subsets (e.g., Micro) of craft breweries).
            </li>
            <li>
              Select multiple <strong>States</strong> to compare regions.
            </li>
            <li>
              Drag <strong>Max ZIP Code</strong> left to roughly focus on the east coast (ZIP codes tend to lower eastward).
            </li>
            <li>
              Use <strong>Search</strong> to jump to a specific brewery by name.
            </li>
            <li>
              Hit <strong>Refresh 🔄</strong> for a new random sample of breweries.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterTips;
