import React from "react";
import { Fab } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useGlobals } from "../../hooks/useGlobals";
import { TableUpdateInput } from "../../../lib/types/table";
import { TableCall } from "../../../lib/enums/table.enum";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import "../../../css/mobile/navbar.css";

interface CallButtonPorps {
  callHandler: (id: string) => void;
}

export default function CallButton(props: CallButtonPorps) {
  const { callHandler } = props;
  const { authTable } = useGlobals();
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <Fab
        color="secondary"
        aria-label="call-waiter"
        onClick={() => {
          if (authTable)
            callHandler(authTable?._id as string);
        }}
        className="mobile-call-waiter-btn"
      >
        <SupportAgentIcon className="mobile-call-waiter-icon" />
        <span className="mobile-call-waiter-text">call</span>
      </Fab>
    );
  }

  return (
    <Fab
      color="secondary"
      aria-label="call-waiter"
      onClick={() => {
        if (authTable)
          callHandler(authTable?._id as string);
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100px",
        width: "100px",
        position: "fixed",
        bottom: 40,
        right: 40,
        zIndex: 1000,
      }}
    >
      <SupportAgentIcon sx={{ height: 50, width: 50 }} />
      <span style={{ fontWeight: "900" }}>call</span>
    </Fab>
  );
}
