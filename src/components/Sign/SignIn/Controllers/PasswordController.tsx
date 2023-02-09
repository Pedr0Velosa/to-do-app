import React, { useState } from "react";
import OutlinedInput from "@/components/Input/OutlinedInput";
import { Control, Controller } from "react-hook-form";
import { ISignInForm } from "../SignIn";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordController = ({
  control,
}: {
  control: Control<ISignInForm, any>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const tooglePassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <>
          <OutlinedInput
            field={field}
            label="Password"
            id="password"
            required={false}
            type={showPassword ? "text" : "password"}
            margin="normal"
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
  );
};

export default PasswordController;
