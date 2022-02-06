import reactDom from "react-dom";

interface IModalPortalProps {
  children: JSX.Element
}

const ModalPortal = ({ children }: IModalPortalProps) => {
  const el = document.getElementById("portal");
  if (el) return reactDom.createPortal(children, el);
  else return <></>;
};

export default ModalPortal;
