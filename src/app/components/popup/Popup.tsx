import React, { ReactElement, useState, useEffect } from "react";
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
  const { children, className = "", header, isOpen, onClose } = props;
  const [open, setOpen] = useState(false);
  const { getIconByType } = useIconManager();

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  return (
    open && (
      <MasterScreen
        isAnimatedScreen
        hideProgressBar
        type={ScreenType.Popup}
        className={`popup ${className}`}
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
        <>{children}</>
      </MasterScreen>
    )
  );
}
