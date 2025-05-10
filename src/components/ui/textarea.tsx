"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { InputWrapper } from "@components/ui/input";

import { cn } from "@lib/utils";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
  animate?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, animate, ...props }, ref) => {
    return (
      <InputWrapper className={error ? "!bg-red-500" : ""} animate={animate}>
        <textarea
          className={cn(
            `dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition duration-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </InputWrapper>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
