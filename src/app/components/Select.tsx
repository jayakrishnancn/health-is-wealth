import { FunctionComponent } from "react";

interface SelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: string[];
  name: string;
}

const Select: FunctionComponent<SelectProps> = ({
  onChange,
  value,
  options,
  name,
}) => {
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={onChange}
      value={value}
      name={name}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
