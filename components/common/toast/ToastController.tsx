// 새 토스트 메세지를 작성하고 기존 메세지를 제거하는 클래스
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
    const body = document.getElementById("toast-container") as HTMLElement;
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container-main";
    body.insertAdjacentElement("beforeend", toastContainer);
    this.containerRef = toastContainer;
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
