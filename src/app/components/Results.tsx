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

type ResultsPropType = Partial<Measurements> & {};

export default function Results({
  heightInCM,
  weightInKg: weightInCM,
  waistInCM,
}: ResultsPropType) {
  const results: CalculateResultType[] = calculateResults({
    heightInCM: heightInCM || 0,
    weightInKg: weightInCM || 0,
    waistInCM: waistInCM || 0,
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
      <Table sx={{ tableLayout: "fixed" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell> Indicator </TableCell>
            <TableCell> Current </TableCell>
            <TableCell> Reference </TableCell>
            <TableCell> Notes </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results?.length > 0 ? (
            results.map(({ indicator, methods }) => (
              <TableRow key={indicator}>
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
                  {
                    methods.find((i, index) =>
                      selectedMethods[indicator]
                        ? i.name === selectedMethods[indicator]
                        : index === 0
                    )?.result
                  }
                </TableCell>
              </TableRow>
            ))
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
