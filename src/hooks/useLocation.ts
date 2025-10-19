import { useContext } from "react";
import { LocationContextType, LocationContext } from "@contexts/location";

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};
