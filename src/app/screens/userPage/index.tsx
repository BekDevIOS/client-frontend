import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import "../../../css/userPage.css";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import useDeviceDetect from "../../hooks/useDeviceDetect";

export default function UserPage() {
  const history = useHistory();
  const { authMember, authTable } = useGlobals();
  const device = useDeviceDetect();
  /** HANDLERS **/
  const clickHandler = () => {
    const confirmation = window.confirm("Do you want to go Admin Panel");
    if (confirmation) {
      // ADMIN panel link
      window.location.href = "http://localhost:3001";
    }
  };

  // Redirect authTable to products page (authTable cannot access user page)
  if (authTable) {
    history.push("/products");
    return null;
  }

  if (!authMember) history.push("/");

  if (device === "mobile") {
    return <div>Mobile User Page</div>;
  } else {
    return (
      <div className={"user-page"}>
        <Container>
          <Stack className={"my-page-frame"}>
            <Stack className={"my-page-left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <Box className={"menu-name"}>Modify Member Details</Box>
                <Box className={"menu-content"}>
                  <Settings />
                </Box>
              </Box>
            </Stack>

            <Stack className={"my-page-right"}>
              <Box className={"order-info-box"}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order-user-img"}>
                    <img
                      src={
                        authMember?.memberImage
                          ? `${serverApi}/${authMember.memberImage}`
                          : "/icons/default-user.svg"
                      }
                      className={"order-user-avatar"}
                    />
                    <div className={"order-user-icon-box"}>
                      <img
                        src={
                          authMember?.memberType === MemberType.RESTAURANT
                            ? "/icons/restaurant.svg"
                            : "/icons/user-badge.svg"
                        }
                      />
                    </div>
                  </div>
                  <span className={"order-user-name"}>
                    {authMember?.memberNick}
                  </span>
                  <span
                    className={
                      authMember?.memberType === MemberType.RESTAURANT
                        ? "order-admin-prof"
                        : "order-user-prof"
                    }
                    onClick={() => {
                      authMember?.memberType === MemberType.RESTAURANT &&
                        clickHandler();
                    }}
                  >
                    {authMember?.memberType === MemberType.RESTAURANT
                      ? "ADMIN"
                      : authMember?.memberType}
                  </span>
                  <span className={"order-user-prof"}>
                    {authMember?.memberAddress
                      ? authMember.memberAddress
                      : "no address"}
                  </span>
                </Box>
                <Box className={"user-media-box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <p className={"user-desc"}>
                  {authMember?.memberDesc
                    ? authMember.memberDesc
                    : "no description"}
                </p>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }
}
