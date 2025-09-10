import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";
import { Table } from "../../lib/types/table";

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  orderBulder: Date;
  setOrderBulder: (input: Date) => void;
  authTable: Table | null;
  setAuthTable: (table: Table | null) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobals withit Provider");
  return context;
};
