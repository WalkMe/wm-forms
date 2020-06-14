import React, { ReactElement, useState, useEffect, useRef } from "react";
import MasterScreen from "../../layout/screens/master-screen/MasterScreen";
import { ScreenType } from "../../interfaces/screen/screen.interface";
import Button, { ButtonType } from "../buttons/Button";
import useIconManager, { Icon } from "../../hooks/useIconManager";

export interface IPopupProps {
  header: ReactElement;
  children: ReactElement;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup(props: IPopupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { children, className = "", header, isOpen, onClose } = props;
  const [open, setOpen] = useState(false);
  const [loadedClass, setLoadedClass] = useState("");
  const { getIconByType } = useIconManager();

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
      scrollRef.current.scrollTo({
        top: 0,
      });
    }

    return () => setOpen(false);
  }, [isOpen]);

  // Detect component did mount to prevent the popup animation on load
  useEffect(() => {
    setLoadedClass("loaded");
    setTimeout(() => {
      setLoadedClass("");
    }, 3000);
  }, []);

  return (
    <MasterScreen
      isAnimatedScreen
      hideProgressBar
      type={ScreenType.Popup}
      className={`${className} ${loadedClass} ${
        open ? "open-popup" : "close-popup"
      }`}
      scrollForwardedRef={scrollRef}
      header={
        <>
          <Button
            className="close"
            id="close-popup"
            tmButtonType={ButtonType.NoBorder}
            buttonClicked={() => {
              setOpen(false);
              onClose();
            }}
          >
            {getIconByType(Icon.Close)}
          </Button>
          {header}
        </>
      }
    >
      <>
        {children}
        <footer className="popup-footer">
          <Button
            id="close-popup-cta"
            tmButtonType={ButtonType.Default}
            buttonClicked={() => {
              setOpen(false);
              onClose();
            }}
          >
            <span className="btn-label">Cancel</span>
          </Button>
        </footer>
      </>
    </MasterScreen>
  );
}
