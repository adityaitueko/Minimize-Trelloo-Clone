"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export interface Suggestion {
  id: string;
  name: string;
  email: string;
}

interface AutosuggestProps {
  suggestions: Suggestion[];
  onSuggestionsFetchRequested?: () => void;
  onSuggestionsClearRequested: () => void;
  getSuggestionValue: (suggestion: Suggestion) => string;
  renderSuggestion: (suggestion: Suggestion) => React.ReactNode;
  onSuggestionSelected: (
    event: React.FormEvent<HTMLElement>,
    { suggestion }: { suggestion: Suggestion }
  ) => void;
  inputProps: {
    placeholder: string;
    value: string;
    onChange: (event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => void;
  };
  theme?: {
    container?: string;
    suggestionsContainer?: string;
    suggestion?: string;
    suggestionHighlighted?: string;
  };
  className?: string;
}

export default function Autosuggest({
  suggestions,
  getSuggestionValue,
  renderSuggestion,
  onSuggestionSelected,
  inputProps,
  theme,
  className,
}: AutosuggestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { value, onChange, ...restInputProps } = inputProps;

  useEffect(() => {
    setIsOpen(suggestions.length > 0);
    setHighlightedIndex(null);
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1)
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev === null ? suggestions.length - 1 : Math.max(prev - 1, 0)
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex !== null && suggestions[highlightedIndex]) {
            const syntheticEvent = {
              preventDefault: () => {},
            } as unknown as React.FormEvent<HTMLElement>;
            onSuggestionSelected(syntheticEvent, {
              suggestion: suggestions[highlightedIndex],
            });
            setIsOpen(false);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, highlightedIndex, suggestions, onSuggestionSelected]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(event as unknown as React.FormEvent<HTMLElement>, { newValue });
  };

  const handleSuggestionClick = (suggestion: Suggestion, index: number) => {
    const syntheticEvent = {
      preventDefault: () => {},
    } as unknown as React.FormEvent<HTMLElement>;
    onSuggestionSelected(syntheticEvent, { suggestion });
    setIsOpen(false);
    setHighlightedIndex(index);
  };

  return (
    <div ref={containerRef} className={cn("relative", theme?.container, className)}>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder={restInputProps.placeholder}
        className="w-full"
      />

      {isOpen && suggestions.length > 0 && (
        <div
          className={cn(
            "absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border rounded-md shadow-lg overflow-auto",
            theme?.suggestionsContainer
          )}
          style={{ maxHeight: "200px" }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion, index)}
              className={cn(
                "cursor-pointer px-4 py-2",
                theme?.suggestion,
                index === highlightedIndex
                  ? cn("bg-blue-50 dark:bg-blue-900/30", theme?.suggestionHighlighted)
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {renderSuggestion(suggestion)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
