import { createPortal } from "react-dom";

function Modal({ message }) {
  return createPortal(<div>{message}</div>, document.getElementById("modal"));
}

export default Modal;
