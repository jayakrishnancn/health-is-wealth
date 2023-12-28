import React from "react";
import TextField from "@mui/material/TextField";

type InputProps = {
  label: string;
  onChange: (e: React.ChangeEvent) => void;
  onBlur: (e: React.ChangeEvent) => void;
  name: string;
  value: string | number;
  type: "number" | "text";
};

export const Input = ({ type, label, onChange, onBlur, name, value }: InputProps) => {
  return (
    <TextField
      fullWidth
      type={type} 
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
  );
};
