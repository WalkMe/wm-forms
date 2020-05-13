import React, { useEffect, useRef } from "react";

import useViewManager from "../../hooks/useViewManager";
import { useLocation } from "react-router-dom";
import { ButtonType } from "../../components/buttons/Button";
import RouteButton from "../../components/buttons/route-button/RouteButton";
import { Icon } from "../../hooks/useIconManager";

export default function Header() {
  const { pathname } = useLocation();
  const { animateCoreElements } = useViewManager();
  const logo = useRef();
  const innerHeader = useRef();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      animateCoreElements({
        elements: [logo.current],
        animateClassName: "fadeInDown",
        timeout: 0,
      });
    } else {
      animateCoreElements({
        elements: [innerHeader.current],
        animateClassName: "fadeInDown",
        timeout: 300,
      });
    }
  }, [isHomePage]);

  const homePageHeader = (
    <>
      <div ref={logo} className="logo topElement">
        <a href="#" draggable="true"></a>
      </div>
    </>
  );

  const innerPageHeader = (
    <div ref={innerHeader} className="inner-header topElement">
      <RouteButton
        label="Back to Courses Menu"
        iconType={Icon.ArrowLeft}
        id="back_to_courses"
        className="back-btn"
        buttonType={ButtonType.NoBorder}
        linkTo="/"
      />
    </div>
  );

  return (
    <div className="header">
      <div className={`general-header wrapper`}>
        {isHomePage ? homePageHeader : innerPageHeader}
      </div>
    </div>
  );
}
