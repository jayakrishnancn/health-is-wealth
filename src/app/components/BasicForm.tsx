import React from "react";
import { Input } from "./Input";
import { useFormik } from "formik";
import Results from "./Results";

export default function BasicForm() {
  const formik = useFormik({
    initialValues: {
      heightInCM: 171,
      weightInCM: 80,
    },
    onSubmit: () => {},
  });

  return (
    <div>
      <div className="flex mb-8 gap-2 bg-white p-2 rounded shadow-md">
        <Input
          label="Height (cm)"
          name="heightInCM"
          value={formik.values.heightInCM}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
        />
        <Input
          label="Weight (kg)"
          name="weightInCM"
          value={formik.values.weightInCM}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
        />
      </div>
      <h1>Result</h1>
      <Results
        heightInCM={formik.values.heightInCM}
        weightInCM={formik.values.weightInCM}
      />
    </div>
  );
}
