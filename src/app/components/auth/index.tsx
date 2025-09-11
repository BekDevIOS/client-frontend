import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Fade,
  Fab,
  Stack,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

const Transition = React.forwardRef(function Transition(
  props: React.ComponentProps<typeof Fade>,
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleLoginClose: () => void;
  handleSignupClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember, setAuthTable } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) handleSignupRequest();
    else if (e.key === "Enter" && loginOpen) handleLoginRequest();
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill = memberNick && memberPassword && memberPhone;
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick,
        memberPassword,
        memberPhone,
      };
      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      setAuthTable(null);
      setMemberPassword("");
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick && memberPassword;
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = { memberNick, memberPassword };
      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      setAuthTable(null);
      setMemberPassword("");
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err);
    }
  };

  return (
    <>
      {/* SIGNUP DIALOG */}
      <Dialog
        open={signupOpen}
        onClose={handleSignupClose}
        TransitionComponent={Transition}
        maxWidth={false}
        PaperProps={{
          sx: {
            p: 2,
            border: "2px solid #000",
            boxShadow: 5,
            width: 800,
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Stack direction="row">
            <ModalImg src={"/img/auth.webp"} alt="camera" />
            <Stack sx={{ ml: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ mt: "7px" }}
                id="signup-username"
                label="username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id="signup-phone"
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="signup-password"
                label="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ mt: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* LOGIN DIALOG */}
      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        TransitionComponent={Transition}
        maxWidth={false}
        PaperProps={{
          sx: {
            p: 2,
            border: "2px solid #000",
            boxShadow: 5,
            width: 700,
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Stack direction="row">
            <ModalImg src={"/img/auth.webp"} alt="camera" />
            <Stack sx={{ ml: "65px", mt: "25px", alignItems: "center" }}>
              <h2>Login Form</h2>
              <TextField
                id="login-username"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id="login-password"
                label="password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ mt: "27px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
