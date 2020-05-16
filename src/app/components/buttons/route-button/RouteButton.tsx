import React from "react";
import Button, { ButtonType } from "../Button";
import { Link, useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  const { getIconByType } = useIconManager();
  const icon = getIconByType(iconType);

  const getRelativePath = ({ path }: { path: string }): string => {
    const splitUrl = pathname.split("/").filter((s: string) => Boolean(s));
    const [root, child, grandChild] = splitUrl;
    const defaultPath = child ? path.substr(1).replace(root, ".") : path;
    const relativePath = grandChild
      ? path.substr(1).replace(`${root}/child`, "..")
      : defaultPath;
    return relativePath;
  };

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
