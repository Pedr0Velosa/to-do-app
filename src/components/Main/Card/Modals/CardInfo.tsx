import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { singleTodoType } from "@/services/todo/getTodo";
import { Box, Typography } from "@mui/material";

type CardInfoProps = { id: string };

const CardInfo = ({ id }: CardInfoProps) => {
  const { data } = useQuery<singleTodoType>({
    queryKey: ["todos", id],
    queryFn: () => axios(`/api/todo/${id}`).then((res) => res.data),
  });
  return (
    <Box>
      <Typography>{data?.title}</Typography>
      <Typography>{data?.status}</Typography>
      <Typography>
        {data?.tasks.map((task) => (
          <>{task.title}</>
        ))}
      </Typography>
      <Typography>{data?.description}</Typography>
    </Box>
  );
};

export default CardInfo;
