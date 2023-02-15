import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import useAuth from "@/utils/hooks/useAuth";

type HeaderProps = {
  username: string;
};

export default function Header({ username }: HeaderProps) {
  const { logOut, user } = useAuth();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: "capitalize" }}>
            Welcome {username ?? user?.username}
          </Typography>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
