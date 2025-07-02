import { ChevronDownIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { useState } from "react"

type DatePickerWithClearProps = {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const DatePickerWithClear = ({ label, date, setDate }: DatePickerWithClearProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1">
        {label}
      </Label>
      <div className='flex gap-0.5'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dateFrom"
              className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="outline"
        disabled={!date}
        onClick={() => setDate(undefined)}
        size="icon"
        aria-label="Clear date from"
      >
        ✕
      </Button>
      </div>
    </div>
  )
}