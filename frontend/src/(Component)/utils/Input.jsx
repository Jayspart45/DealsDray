/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={cn(
        "border-2 rounded px-2 py-1 outline-none placeholder:text-gray-400 max-w-sm w-full",
        className
      )}
    />
  );
};
