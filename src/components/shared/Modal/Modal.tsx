import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as CloseSvg } from "@images/close.svg";
import "./style.scss";

interface IProps {
  setClosed: () => void;
  children: JSX.Element | JSX.Element[];
  title: string;
}

const Modal: React.FC<IProps> = ({ setClosed, children, title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef<null | HTMLDivElement>(null);

  const closeHandler = (): void => {
    setIsOpen(false);
    setTimeout(() => {
      setClosed();
    }, 400);
  };

  const clickOutSideHandler = (e: MouseEvent): void => {
    const el = e.target as HTMLElement;
    if (el && el.dataset.modal) {
      closeHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutSideHandler);
    return () => {
      document.removeEventListener("click", clickOutSideHandler);
    };
  }, []);

  useEffect(() => {
    const modal = modalRef.current as HTMLDivElement;
    if (isOpen) {
      modal.style.animation =
        "openModal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both";
    } else {
      modal.style.animation =
        "closeModal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both";
    }
  }, [isOpen]);

  return (
    <div data-modal="modal" className="my_modal-wrapper">
      <div className="my_modal" ref={modalRef}>
        <p className="my_modal__title">{title}</p>
        {children}
        <div>
          <div className="my_modal__close" onClick={closeHandler}>
            <CloseSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
