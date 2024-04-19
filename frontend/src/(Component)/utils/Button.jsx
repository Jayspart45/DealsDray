/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

export const Button = ({ text, className, ...props }) => {
  return (
    <button {...props} className={cn("w-40 bg-color3  px-4 py-2 rounded hover:bg-color2  hover:shadow-md font-semibold cursor-pointer", className)}>
      {text}
    </button>
  );
};
