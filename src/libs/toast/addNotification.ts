import { toast } from "react-toastify";

type addNotificationType = {
  title: string;
  type: "default" | "success" | "error" | "warning";
};

export default function addNotification({
  title,
  type = "default",
}: addNotificationType) {
  toast(title, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type,
  });
}
