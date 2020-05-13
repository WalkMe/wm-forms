import React from "react";
import Button, { ButtonType } from "../Button";
import { Link } from "react-router-dom";
import useIconManager, { IconType } from "../../../hooks/useIconManager";

export default function RouteButton({
  id,
  iconType,
  label,
  linkTo,
  buttonType = ButtonType.None,
  className,
}: {
  id: string;
  label: string;
  linkTo: string;
  buttonType?: ButtonType;
  iconType?: IconType;
  className?: string;
}) {
  const icon = useIconManager(iconType);

  return (
    <Button className={className} id={id} tmButtonType={buttonType}>
      <Link to={linkTo}>
        <span className="btn-label">
          {icon}
          {label}
        </span>
      </Link>
    </Button>
  );
}
