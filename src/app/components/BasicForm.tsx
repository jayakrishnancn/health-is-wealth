import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Inputs, Measurements } from "../utils/calculations/type";
import { Input } from "./Input";
import Results from "./Results";
import Select from "./Select";

// const INITIAL_MEASUREMENTS: Measurements = {
//   heightInCM: 171,
//   waistInCM: 100,
//   weightInKg: 80,
// };

export default function BasicForm() {
  const [measurements, setMeasurements] = useState<Partial<Measurements>>({
    sex: "Male",
  });

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value) || "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    setMeasurements((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const reCalculate = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {};

  return (
    <div className="flex items-start gap-4">
      <div className="flex gap-4 min-w-40 pt-6 flex-col bg-white p-2 rounded shadow">
        <Select
          label="Sex"
          options={["Male", "Female"]}
          name={Inputs.Sex}
          value={measurements.sex ?? "Male"}
          onChange={handleChange}
        />

        <Input
          label="Height (cm)"
          name={Inputs.HeightInCM}
          autoFocus
          value={measurements[Inputs.HeightInCM]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
        />
        <Input
          label="Weight (Kg.)"
          name={Inputs.WeightInKg}
          value={measurements[Inputs.WeightInKg]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
        />
        <Input
          label="Waist (cm)"
          name={Inputs.WaistInCm}
          value={measurements[Inputs.WaistInCm]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
        />
        <Input
          label="Age"
          name={Inputs.Age}
          value={measurements[Inputs.Age]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
        />
        <Input
          label="Hip (cm)"
          name={Inputs.HipInCm}
          value={measurements[Inputs.HipInCm]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
        />
      </div>
      <div className="bg-white shadow rounded pt-4 flex-1 pb-2 min-h-96">
        <h1 className="px-4 mb-4 h1 font-bold text-slate-900">Results</h1>
        <Results {...measurements} />
      </div>
    </div>
  );
}
