import { createContext, useContext, useState } from "react";
import { inspections as initialInspections } from "../data/dummyData";

const InspectionContext = createContext();

export function InspectionProvider({ children }) {
  const [inspectionList, setInspectionList] =
    useState(initialInspections);

  const addInspection = (inspection) => {
    setInspectionList((currentList) => [
      ...currentList,
      inspection
    ]);
  };

  return (
    <InspectionContext.Provider
      value={{
        inspectionList,
        addInspection
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
}

export function useInspections() {
  return useContext(InspectionContext);
}