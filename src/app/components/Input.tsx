import TextField from "@mui/material/TextField";
import React from "react";

type InputProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  name: string;
  value: string | number | undefined;
  type: "number" | "text";
  autoFocus?: boolean;
};

export const Input = ({
  type,
  label,
  onChange,
  onBlur,
  name,
  value,
  autoFocus,
}: InputProps) => {
  return (
    <TextField
      fullWidth
      autoFocus={autoFocus}
      type={type}
      label={label}
      value={value ?? ""}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
  );
};
