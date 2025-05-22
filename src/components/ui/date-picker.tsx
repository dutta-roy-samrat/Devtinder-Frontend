"use client";

import { forwardRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
interface DatePickerProps {
  value?: string;
  onChange?: (event: { target: { name?: string; value: string } }) => void;
  className?: string;
  name?: string;
  required?: boolean;
}

const today = new Date();

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, onChange = () => {}, name, required, ...props }, ref) => {
    const [date, setDate] = useState<Date | undefined>();

    const handleSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      onChange({
        target: {
          name: name,
          value: selectedDate ? selectedDate.toISOString() : "",
        },
      });
    };

    return (
      <div className="relative">
        <input
          type="hidden"
          ref={ref}
          name={name}
          required={required}
          value={date ? date.toISOString() : ""}
          {...props}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground hover:text-muted-foreground",
                className,
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/LL/yyyy") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={today.getFullYear()}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
