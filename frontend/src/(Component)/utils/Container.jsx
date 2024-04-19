/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

const Container = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        " flex justify-center items-center flex-col font-Montserrat bg-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
