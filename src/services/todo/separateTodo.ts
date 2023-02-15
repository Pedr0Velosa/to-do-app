import { KanbanStatus } from "@/utils/types/Kanban";
import { Task } from "@/utils/types/Task";

type dataType = {
  id: string;
  status: KanbanStatus;
  title: string;
  updatedAt: Date;
  tasks: Task[];
};

type separateDataType = {
  "to-do": dataType[];
  doing: dataType[];
  done: dataType[];
};

export function separateTodo(data: dataType[]): separateDataType {
  let separateData: separateDataType = { "to-do": [], doing: [], done: [] };
  data.forEach((val) => {
    separateData[val.status].push(val);
  });
  return separateData;
}
