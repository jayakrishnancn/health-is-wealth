import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { calculateResults } from "../utils/calculations";
import { CalculateResultType, Measurements } from "../utils/calculations/type";
import { round } from "../utils/round";

type ResultsPropType = Partial<Measurements> & {};

export default function Results({
  heightInCM,
  weightInKg: weightInCM,
  waistInCM,
  sex,
  age,
}: ResultsPropType) {
  const results: CalculateResultType[] = calculateResults({
    heightInCM: heightInCM || 0,
    weightInKg: weightInCM || 0,
    waistInCM: waistInCM || 0,
    sex: sex ?? "Male",
    age: age ?? 0,
  });

  const [selectedMethods, setSelectedMethods] = useState<{
    [key: string]: string;
  }>({});
  const handleChangeMethod = (
    indicator: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMethods((prev) => ({
      ...prev,
      [indicator]: e.target.value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell> Indicator </TableCell>
            <TableCell> Method </TableCell>
            <TableCell> Result </TableCell>
            <TableCell> Unit </TableCell>
            <TableCell> Status </TableCell>
            <TableCell> Notes </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.length > 0 ? (
            results.map(({ indicator, methods }) => {
              const obj = methods.find((i, index) =>
                selectedMethods[indicator]
                  ? i.name === selectedMethods[indicator]
                  : index === 0
              );
              return (
                <TableRow
                  className={obj?.colorCode ? `row-${obj?.colorCode}` : ""}
                  key={indicator}
                >
                  <TableCell> {indicator} </TableCell>
                  <TableCell>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleChangeMethod(indicator, e)}
                      value={selectedMethods[indicator]}
                    >
                      {methods.map((method) => (
                        <option key={method.name}>{method.name}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    {isNaN(Number(obj?.result))
                      ? obj?.result
                      : round(Number(obj?.result))}
                  </TableCell>
                  <TableCell>{obj?.Unit}</TableCell>
                  <TableCell>{obj?.status}</TableCell>
                  <TableCell>{obj?.notes_or_details}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow key="error">
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                No Results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
