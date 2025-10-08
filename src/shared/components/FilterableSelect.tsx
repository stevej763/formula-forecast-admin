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
}

const FilterableSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className = "",
  error = false,
  id
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
        className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:border-transparent ${
          error 
            ? "border-red-500 focus:ring-red-400" 
            : "border-blue-400/30 focus:ring-blue-400"
        } ${className}`}
        autoComplete="off"
      />
      
      {/* Dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg 
          className={`w-4 h-4 text-blue-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-blue-500/30 rounded-lg shadow-lg max-h-60 overflow-auto">
          <ul ref={listRef} className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    index === highlightedIndex
                      ? "bg-blue-600 text-white"
                      : "text-blue-200 hover:bg-blue-700/50 hover:text-white"
                  }`}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-400">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterableSelect;