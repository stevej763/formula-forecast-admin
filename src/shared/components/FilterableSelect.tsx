import { useState, useRef, useEffect, type KeyboardEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface FilterableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  id?: string;
  emptyMessage?: string;
}

const FilterableSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className = "",
  error = false,
  id,
  emptyMessage = "No matches"
}: FilterableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : "";

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase()) ||
    option.value.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setFilter("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFilter("");
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay to allow option click to register
    setTimeout(() => {
      setIsOpen(false);
      setFilter("");
      setHighlightedIndex(-1);
    }, 150);
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={isOpen ? filter : displayValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-autocomplete="list"
        aria-invalid={error}
        className={`h-10 w-full rounded-md border bg-carbon pr-9 pl-3 text-chalk placeholder:text-ash/70 focus:outline-none ${
          error ? "border-signal" : "border-graphite focus:border-chalk"
        } ${className}`}
        autoComplete="off"
      />
      
      {/* Dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg 
          className={`h-4 w-4 text-ash transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="ff-scrollbar absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-graphite bg-black">
          <ul ref={listRef} id={id ? `${id}-listbox` : undefined} role="listbox" className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`cursor-pointer px-3 py-2 text-sm ${
                    index === highlightedIndex ? "bg-graphite text-chalk" : "text-chalk hover:bg-carbon"
                  }`}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-ash">{emptyMessage}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterableSelect;