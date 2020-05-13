import React from "react";
import { config } from "../config";

export default function useAppManager() {
  const getUrlParamValueByName = (name: string) => {
    const searchUrlParam = new URLSearchParams(location.search);
    return searchUrlParam.get(name);
  };

  /**
   * addGuidSpecificStyle
   * Adding custom styles by guid
   */
  const addGuidSpecificStyle = () => {
    const guid = getUrlParamValueByName("guid");
    if (guid) {
      const cssSrc = `styles/${guid}/main.css`;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssSrc;

      document.body.append(link);
    }
  };

  /**
   * getDebugError
   */
  const getDebugError = (): string => {
    const platformType = getUrlParamValueByName("platform");
    let guid = getUrlParamValueByName("guid");

    if (guid === "1bcce0aee803406983e4050e0f985e6c")
      guid = `${guid} (Project Widelab)`;
    if (guid === "441591f37cad4aedafb740c52b1aab64") guid = `${guid} (Local)`;
    const host = location.host;

    return `${host}, ${
      platformType.charAt(0).toUpperCase() + platformType.slice(1)
    }, ${guid}, v${config.debug_appVersion}`;
  };

  return {
    addGuidSpecificStyle,
    getDebugError,
    getUrlParamValueByName,
  };
}
