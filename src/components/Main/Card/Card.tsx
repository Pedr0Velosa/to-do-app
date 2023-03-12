import React, { useState, useEffect } from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import { Todo } from "@/utils/types/Todo";
import { useDrag } from "react-dnd";
import { ItemType } from "@/utils/ItemType";
import TasksController from "./Tasks/controller/TasksController";
import CardInfo from "./CardModal/CardInfo";

import NewTaskController from "./Tasks/controller/NewTaskController";
import TasksContainer from "./Tasks/TaskContainer";
import CardTitle from "./Title/CardTitle";

type CardProps = {
  todo: Todo;
};
export type newTask = { newTask: string };

const Card = ({ todo }: CardProps) => {
  const [isNewTaskInputVisible, setIsNewTaskInputVisible] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { id: todo.id, todoStatus: todo.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const setNewTaskInputFalse = () => setIsNewTaskInputVisible(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const opacity = isDragging ? 0.5 : 1;

  return (
    <>
      <CardInfo id={todo.id} close={closeModal} isOpen={isOpenModal} open={openModal} />

      <MuiCard id={todo.id} ref={drag} sx={{ opacity, flexShrink: 0 }}>
        <CardContent>
          <CardTitle openModal={openModal} title={todo.title} />
        </CardContent>
        <CardContent sx={{ py: 0 }}>
          <TasksContainer setIsVisile={setIsNewTaskInputVisible}>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} disablePadding>
              <TasksController tasks={todo.tasks} status={todo.status} />
              {isNewTaskInputVisible ? (
                <NewTaskController todoprops={todo} setIsVisible={setNewTaskInputFalse} />
              ) : null}
            </List>
          </TasksContainer>
        </CardContent>
      </MuiCard>
    </>
  );
};

export default Card;
