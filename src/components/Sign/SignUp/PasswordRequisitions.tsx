import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const upperCase = /(?=.*?[A-Z])/;
const lowerCase = /(?=.*?[a-z])/;
const digit = /(?=.*?[0-9])/;
const specialCharacter = /(?=.*?[#?!@$%^&*-])/;
const minLength = /.{8,}$/;

const PasswordRequisitions = ({ password = "" }: { password: string }) => {
  return (
    <>
      <List sx={{ bgcolor: "ButtonFace", borderRadius: 1 }}>
        <ListItem>
          <ListItemAvatar>
            <CheckCircleIcon
              color={upperCase.test(password) ? "success" : "error"}
            />
          </ListItemAvatar>
          <ListItemText primary="At least one upper case" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <CheckCircleIcon
              color={lowerCase.test(password) ? "success" : "error"}
            />
          </ListItemAvatar>
          <ListItemText primary="At least one lower case" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <CheckCircleIcon
              color={digit.test(password) ? "success" : "error"}
            />
          </ListItemAvatar>
          <ListItemText primary="At least one digit" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <CheckCircleIcon
              color={specialCharacter.test(password) ? "success" : "error"}
            />
          </ListItemAvatar>
          <ListItemText primary="At least one special character" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <CheckCircleIcon
              color={minLength.test(password) ? "success" : "error"}
            />
          </ListItemAvatar>
          <ListItemText primary="Minimum eight in length" />
        </ListItem>
      </List>
    </>
  );
};

export default PasswordRequisitions;
