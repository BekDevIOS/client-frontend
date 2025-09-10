import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";
import { Table } from "../../lib/types/table";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );
  if (!cookies.get("tableToken")) localStorage.removeItem("tableData");

  const [authTable, setAuthTable] = useState<Table | null>(
    localStorage.getItem("tableData")
      ? JSON.parse(localStorage.getItem("tableData") as string)
      : null
  );
  const [orderBulder, setOrderBulder] = useState<Date>(new Date());
  console.log("==== verify =====");

  return (
    <GlobalContext.Provider
      value={{
        authMember,
        setAuthMember,
        orderBulder,
        setOrderBulder,
        authTable,
        setAuthTable,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
