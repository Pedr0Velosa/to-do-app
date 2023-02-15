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
import FirstNameController from "./Controllers/FirstNameController";
import LastNameController from "./Controllers/LastNameController";
import EmailController from "./Controllers/EmailController";
import PasswordController from "./Controllers/PasswordController";
import ConfirmedPasswordController from "./Controllers/ConfirmedPasswordController";
import { useForm } from "react-hook-form";
import PasswordRequisitions from "./PasswordRequisitions";
import UsernameError from "./Errors/UsernameError";
import EmailError from "./Errors/EmailError";
import PasswordError from "./Errors/PasswordError";
import ConfirmedPasswordError from "./Errors/ConfirmedPasswordError";
import axios from "axios";
import { METHODS } from "@/utils/Methods";
import Router from "next/router";

export type ISignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ["confirmed-password"]: string;
};

type sendDataType = {
  username: string;
  password: string;
  email: string;
};

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const defaultValues: ISignUpForm = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  "confirmed-password": "",
};

export default function SignUp() {
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISignUpForm>({
    defaultValues,
  });

  const onSubmit = async (data: ISignUpForm) => {
    const { firstName, lastName, password, "confirmed-password": confirmed_password, email } = data;
    if (!validatePasswords(password, confirmed_password) || !validateEmail(email)) return;
    const username = `${firstName} ${lastName}`;
    const res = await sendData({ username, password, email });
    if (res.statusText === "OK") {
      reset(defaultValues);
      Router.push("/signin");
    }
  };
  const validatePasswords = (password: string, confirmed_password: string) => {
    const passwordIsValid = passwordRegex.test(password);
    if (!passwordIsValid) {
      setError("password", {
        type: "custom",
        message: "Invalid password",
      });
      return false;
    }
    const passwordsAreEqual = password === confirmed_password;
    if (!passwordsAreEqual) {
      setError("confirmed-password", {
        type: "custom",
        message: "Passwords are different. Try again.",
      });
      setValue("confirmed-password", "");
      return false;
    }
    return true;
  };
  const validateEmail = (email: string) => {
    const emailIsValid = emailRegex.test(email);
    if (!emailIsValid) {
      setError("email", {
        type: "custom",
        message: "Please enter a valid email",
      });
      return false;
    }
    return true;
  };
  const sendData = async ({ username, password, email }: sendDataType) => {
    return await axios("/api/user", {
      method: METHODS.CREATE,
      data: {
        username,
        password,
        email,
      },
    });
  };
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FirstNameController control={control} error={!!errors.firstName} />
              <UsernameError errors={errors} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LastNameController control={control} error={!!errors.lastName} />
            </Grid>
            <Grid item xs={12}>
              <EmailController control={control} error={!!errors.email} />
              <EmailError errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <PasswordController control={control} error={!!errors.password} />
              <PasswordError errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <PasswordRequisitions password={watch("password")} />
            </Grid>
            <Grid item xs={12}>
              <ConfirmedPasswordController control={control} error={!!errors["confirmed-password"]} />
              <ConfirmedPasswordError errors={errors} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
