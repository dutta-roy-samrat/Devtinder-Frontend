"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import { FieldError } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
  animate?: boolean;
}

export const InputWrapper = ({
  children,
  className,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  if (!animate) return children;

  const backgroundStyle = {
    background: `radial-gradient(${visible ? radius + "px" : "0px"} circle at ${mouseX.get()}px ${mouseY.get()}px, #ef4444, transparent 80%)`
  };

  return (
    <motion.div
      style={backgroundStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={cn(
        "group/input rounded-lg p-[2px] transition duration-300",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, animate, ...props }, ref) => {
    return (
      <InputWrapper className={error ? "!bg-red-500" : ""} animate={animate}>
        <input
          type={type}
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
Input.displayName = "Input";

export { Input };
