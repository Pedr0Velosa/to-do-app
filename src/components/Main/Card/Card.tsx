import React from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Todo } from "@/utils/types/Todo";

type CardProps = {
  todo: Todo;
};

const Card = ({ todo }: CardProps) => {
  return (
    <MuiCard>
      <CardContent>
        <Typography variant="h6" component="h1">
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">add task</Button>
      </CardActions>
      <CardContent sx={{ py: 0 }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} disablePadding>
          <ListItem disablePadding>
            {todo.tasks.map((task) => (
              <ListItemButton dense key={task.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": task.id }}
                  />
                </ListItemIcon>
                <ListItemText id={task.id} primary={task.title} />
              </ListItemButton>
            ))}
          </ListItem>
        </List>
      </CardContent>
    </MuiCard>
  );
};

export default Card;