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
  value?: Date;
  onChange?: (event: { target: { name?: string; value: string } }) => void;
  className?: string;
  name?: string;
  required?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    { className, value, onChange = () => {}, name, required, ...props },
    ref,
  ) => {
    const [date, setDate] = useState<Date | undefined>(value);

    useEffect(() => {
      setDate(value);
    }, [value]);

    const handleSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      // Create a synthetic event that React Hook Form expects
      onChange({
        target: {
          name: name,
          value: selectedDate ? format(selectedDate, "dd/LL/yyyy") : "",
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
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
