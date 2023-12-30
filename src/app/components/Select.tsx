import {
  FormControl,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FunctionComponent } from "react";

interface SelectProps {
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string;
  options: string[];
  name: string;
  label: string;
}

const Select: FunctionComponent<SelectProps> = ({
  onChange,
  value,
  options,
  name,
  label,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: "inherit" }} id="demo-simple-select-label">
        {label}
      </InputLabel>
      <MUISelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        size="small"
        sx={{ color: "inherit" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
