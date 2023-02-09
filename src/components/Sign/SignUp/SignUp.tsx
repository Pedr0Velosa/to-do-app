import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@/components/Link/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import OutlinedInput from "@/components/Input/OutlinedInput";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

export type ISignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ["confirmed-password"]: string;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    register,
    formState: { errors },
  } = useForm<ISignUpForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      "confirmed-password": "",
    },
  });

  const tooglePassword = () => setShowPassword(!showPassword);
  const toogleConfirmedPassword = () =>
    setShowConfirmedPassword(!showConfirmedPassword);

  return (
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
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <>
                    <OutlinedInput
                      field={field}
                      label="First Name"
                      id="first-name"
                      required={true}
                      margin="none"
                      fullWidth={false}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <>
                    <OutlinedInput
                      field={field}
                      label="Last Name"
                      id="lastName"
                      required={true}
                      margin="none"
                      fullWidth={false}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <OutlinedInput
                      field={field}
                      label="Email Address"
                      id="email"
                      required={true}
                      type="email"
                      margin="none"
                      fullWidth={true}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <OutlinedInput
                      field={field}
                      label="Password"
                      id="password"
                      required={true}
                      type={showPassword ? "text" : "password"}
                      margin="none"
                      fullWidth={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={tooglePassword}
                            onMouseDown={tooglePassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirmed-password"
                control={control}
                render={({ field }) => (
                  <>
                    <OutlinedInput
                      field={field}
                      label="Confirmed Password"
                      id="confirmed-password"
                      required={true}
                      type={showConfirmedPassword ? "text" : "password"}
                      margin="none"
                      fullWidth={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirmed password visibility"
                            onClick={toogleConfirmedPassword}
                            onMouseDown={toogleConfirmedPassword}
                            edge="end"
                          >
                            {showConfirmedPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </>
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={"/signin"}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
