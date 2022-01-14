import { useEffect } from "react";
import { toast } from "./ToastController";

function ToastContainer() {
  useEffect(() => {
    toast.insertBodyContainer();
  }, []);
  return <div id="toast-container"></div>;
}

export default ToastContainer;
