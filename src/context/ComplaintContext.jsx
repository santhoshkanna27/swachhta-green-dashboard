import { createContext, useContext, useState } from "react";

const ComplaintContext = createContext();

export function ComplaintProvider({ children }) {

  const [complaints, setComplaints] = useState([]);

  const addComplaint = (complaint) => {

    setComplaints((currentComplaints) => [
      ...currentComplaints,
      complaint
    ]);

  };

  const updateComplaint = (id, updatedData) => {

    setComplaints((currentComplaints) =>
      currentComplaints.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              ...updatedData
            }
          : complaint
      )
    );

  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaint
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  return useContext(ComplaintContext);
}