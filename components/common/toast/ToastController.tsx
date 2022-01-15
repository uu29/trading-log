import ReactDOM from "react-dom";
import Toast, { ToastType, ToastProps } from "./Toast";

interface ToastOptions {
  id?: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export class ToastController {
  private containerRef: HTMLDivElement | undefined;
  private toasts: ToastProps[] = [];

  public insertBodyContainer() {
    const toastContainer = document.getElementById("toast-container") as HTMLDivElement;
    toastContainer.setAttribute("style", "position: fixed; right: 0; top: 0;");
    const toastBackground = document.createElement("div");
    toastBackground.setAttribute("style", "position: relative; right: 3rem; top: 11rem;");
    toastContainer.insertAdjacentElement("beforeend", toastBackground);
    this.containerRef = toastBackground;
  }

  public show(options: ToastOptions) {
    const toastId = Math.random().toString(36).substr(2, 9);
    const toast: ToastProps = {
      id: toastId, // 무한 생성시 toastId 넣기
      ...options,
      destroy: () => this.destroy(options.id ?? toastId),
    };
    this.toasts = [...this.toasts, toast];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  public render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps) => <Toast key={toastProps.id} {...toastProps} />);
    if (this.containerRef) ReactDOM.render(toastsList, this.containerRef as HTMLDivElement);
  }
}

export const toast = new ToastController();
