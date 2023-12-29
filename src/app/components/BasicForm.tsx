import { useState } from "react";
import { Measurements } from "../utils/calculations/type";
import { Input } from "./Input";
import Results from "./Results";

const INITIAL_MEASUREMENTS: Measurements = {
  heightInCM: 171,
  waistInCM: 100,
  weightInKg: 80,
};

export default function BasicForm() {
  const [measurements, setMeasurements] = useState<Partial<Measurements>>({});

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value) || "",
    }));
  };

  const reCalculate = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {};

  return (
    <div>
      <div className="flex mb-8 gap-2 bg-white p-2 rounded shadow-md">
        <Input
          label="Height (cm)"
          name="heightInCM"
          value={measurements.heightInCM}
          onChange={handleNumberChange}
          onBlur={reCalculate}
          type="number"
        />
        <Input
          label="Weight (kg)"
          name="weightInCM"
          value={measurements.weightInKg}
          onChange={handleNumberChange}
          onBlur={reCalculate}
          type="number"
        />
        <Input
          label="Waist circumference (cm)"
          name="WaistcircumferenceInCM"
          value={measurements.waistInCM}
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
