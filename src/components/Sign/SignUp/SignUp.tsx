import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@/components/Link/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import FirstNameController from "./Controllers/FirstNameController";
import LastNameController from "./Controllers/LastNameController";
import EmailController from "./Controllers/EmailController";
import PasswordController from "./Controllers/PasswordController";
import ConfirmedPasswordController from "./Controllers/ConfirmedPasswordController";
import { useForm } from "react-hook-form";

const theme = createTheme();

export type ISignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ["confirmed-password"]: string;
};

export default function SignUp() {
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
      email: "",
      "confirmed-password": "",
    },
  });

  const onSubmit = (data: ISignUpForm) => console.log(data);

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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FirstNameController control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LastNameController control={control} />
            </Grid>
            <Grid item xs={12}>
              <EmailController control={control} />
            </Grid>
            <Grid item xs={12}>
              <PasswordController control={control} />
            </Grid>
            <Grid item xs={12}>
              <ConfirmedPasswordController control={control} />
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
