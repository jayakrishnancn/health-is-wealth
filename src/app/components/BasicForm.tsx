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
  const [measurements, setMeasurements] = useState<Partial<Measurements>>({});

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value) || "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMeasurements((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const reCalculate = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {};

  return (
    <div className="flex-1">
      <div className="flex mb-8 gap-2 bg-white p-2 rounded shadow-md">
        <Select
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
          type="number"
        />
        <Input
          label="Weight (Kg.)"
          name={Inputs.WeightInKg}
          value={measurements[Inputs.WeightInKg]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
          type="number"
        />
        <Input
          label="Waist (cm)"
          name={Inputs.WaistInCm}
          value={measurements[Inputs.WaistInCm]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
          type="number"
        />
        <Input
          label="Age"
          name={Inputs.Age}
          value={measurements[Inputs.Age]}
          onChange={handleNumberChange}
          onBlur={reCalculate}
          type="number"
        />
      </div>
      <h1>Result</h1>
      <Results {...measurements} />
    </div>
  );
}
