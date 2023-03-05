import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@/components/Link/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import EmailController from "./Controllers/EmailController";
import PasswordController from "./Controllers/PasswordController";
import useAuth from "@/utils/hooks/useAuth";

const theme = createTheme();

export type ISignInForm = {
  email: string;
  password: string;
  error: string;
};

export default function SignIn() {
  const { signIn } = useAuth();

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    register,
    formState: { errors },
  } = useForm<ISignInForm>({
    defaultValues: { email: "", password: "", error: "" },
  });
  const onSubmit = async (data: ISignInForm) => {
    const { email, password } = data;
    if (!validateForm(email, password)) return;
    const res = await verifyUser(email, password);
    setValue("email", "");
    setValue("password", "");
    if (res.error) {
      setError("error", { type: "custom", message: res.error }, { shouldFocus: false });
      return;
    }
    signIn(res);
  };

  const validateForm = (email: string, password: string) => {
    if (!email) {
      setError("email", { type: "custom", message: "Email must be provided" });
    }
    if (!validateEmail(email)) {
      setError("email", {
        type: "custom",
        message: "Entered value does not match email format",
      });
    }
    if (!password) {
      setError("password", {
        type: "custom",
        message: "Password must be provided",
      });
    }
    if (!email || !password || !validateEmail(email)) return false;
    return true;
  };
  const validateEmail = (email?: string) => {
    if (!email) return true;
    const emailIsValid = /\S+@\S+\.\S+/.test(email);
    return emailIsValid;
  };
  const verifyUser = async (email: string, password: string) => {
    const res = await axios("/api/user", {
      method: METHODS.GET,
      params: { email, password },
    }).then((res) => res.data);
    return res;
  };

  useEffect(() => {
    register("error");
  }, [register]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errors.error && (
            <Typography color={"error"} component={"span"} variant="subtitle1">
              {errors.error.message}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <EmailController control={control} />
            <PasswordController control={control} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href={"/signup"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
