import React, { useState } from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Todo } from "@/utils/types/Todo";
import { useDrag } from "react-dnd";
import { ItemType } from "@/utils/ItemType";
import TasksController from "./Tasks/TasksController";
import { Box, ButtonBase } from "@mui/material";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import CardInfo from "./Modals/CardInfo";

type CardProps = {
  todo: Todo;
};

const Card = ({ todo }: CardProps) => {
  const [isNewTaskInputVisible, setIsNewTaskInputVisible] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { id: todo.id, todoStatus: todo.status },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const toogleVisibility = () => setIsNewTaskInputVisible(!isNewTaskInputVisible);

  const setNewTaskInputFalse = () => setIsNewTaskInputVisible(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const opacity = isDragging ? 0.5 : 1;

  return (
    <>
      <ModalWrapper isOpen={isOpenModal} open={openModal} close={closeModal}>
        <CardInfo id={todo.id} />
      </ModalWrapper>
      <MuiCard id={todo.id} ref={drag} sx={{ opacity }}>
        <CardContent>
          <Box>
            <ButtonBase
              sx={{
                display: "block",
                textAlign: "start",
                width: "100%",
                "&:hover": { background: "none", textDecoration: "underline" },
              }}
              onClick={openModal}
            >
              <Typography component="h1" variant="h6">
                {todo.title}
              </Typography>
            </ButtonBase>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toogleVisibility}>
            add task
          </Button>
        </CardActions>
        <CardContent sx={{ py: 0 }}>
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} disablePadding>
            <TasksController
              tasks={todo.tasks}
              status={todo.status}
              isNewTaskInputVisible={isNewTaskInputVisible}
              todoID={todo.id}
              setNewTaskInputFalse={setNewTaskInputFalse}
            />
          </List>
        </CardContent>
      </MuiCard>
    </>
  );
};

export default Card;
