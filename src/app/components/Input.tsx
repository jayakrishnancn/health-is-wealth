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
};

export const Input = ({
  type,
  label,
  onChange,
  onBlur,
  name,
  value,
}: InputProps) => {
  return (
    <TextField
      fullWidth
      type={type}
      label={label}
      value={value ?? ""}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
  );
};
