import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export type SpinnerType = "plain" | "brand";

interface SpinnerProps {
  classNames?: string;
  type: SpinnerType;
}

export const Spinner = ({ classNames, type = "brand" }: SpinnerProps) => {
  return (
    <div className={`mx-2 max-h-[150px] inline-block my-auto ${classNames ? classNames : "h-6"}`}>
      <CircularProgress size={40} /> {/* Adjust size as needed */}
    </div>
  );
};
