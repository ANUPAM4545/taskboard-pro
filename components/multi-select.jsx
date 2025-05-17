"use client"

import { useState, useRef, useCallback } from "react"
import { X, Check, ChevronsUpDown, Plus } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MultiSelect({
  options,
  selected,
  onChange,
  onCreateOption,
  placeholder = "Select options",
  className,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const handleUnselect = useCallback(
    (value) => {
      onChange(selected.filter((item) => item !== value))
    },
    [onChange, selected],
  )

  const handleSelect = useCallback(
    (value) => {
      onChange([...selected, value])
      setInputValue("")
    },
    [onChange, selected],
  )

  const handleCreateOption = useCallback(() => {
    if (inputValue.trim() === "") return

    const newValue = onCreateOption(inputValue.trim())
    if (newValue) {
      handleSelect(newValue)
    }

    setInputValue("")
  }, [inputValue, onCreateOption, handleSelect])

  const handleKeyDown = useCallback(
    (e) => {
      if (
        e.key === "Enter" &&
        inputValue.trim() !== "" &&
        !options.some((option) => option.label.toLowerCase() === inputValue.toLowerCase())
      ) {
        e.preventDefault()
        handleCreateOption()
      }
    },
    [inputValue, options, handleCreateOption],
  )

  const selectedOptions = options.filter((option) => selected.includes(option.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          onClick={() => {
            setOpen(!open)
          }}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant="secondary"
                  className="mr-1 mb-1"
                  style={{ backgroundColor: option.color + "20", color: option.color, borderColor: option.color }}
                >
                  <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: option.color }}></div>
                  {option.label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option.value)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleUnselect(option.value)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command className="w-full">
          <CommandInput
            ref={inputRef}
            placeholder="Search labels..."
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center py-2">
                <p className="text-sm text-muted-foreground">No label found.</p>
                {inputValue.trim() !== "" && (
                  <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs" onClick={handleCreateOption}>
                    <Plus className="mr-1 h-3 w-3" />
                    Create "{inputValue}"
                  </Button>
                )}
              </div>
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      isSelected ? handleUnselect(option.value) : handleSelect(option.value)
                      setOpen(true)
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }}></div>
                      {option.label}
                    </div>
                    <Check className={cn("ml-auto h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
