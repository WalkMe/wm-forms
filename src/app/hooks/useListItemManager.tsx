import React from "react";
import { useHistory } from "react-router-dom";
import { IListItem } from "../components/list/list-item/ListItem";
import { ISdk } from "@walkme/sdk";

export default function useListItemManager(walkmeSDK: ISdk) {
  const routeHistory = useHistory();

  const handleLinkClick = (link: string) => {
    const isExternalLink =
      link.includes("http://") || link.includes("https://");

    if (isExternalLink) {
      window.open(link, "_blank");
    } else {
      routeHistory.push(link);
    }
  };

  const handleWalkmeSDKClick = (item: IListItem<{}>) => {
    console.log("handleWalkmeSDKClick item", item);
    // walkmeSDK.content.playById(item.type, parseInt(item.id));
    // walkmeSDK.platform.closeMe();
  };

  const handleListItemClick = (item: IListItem<{}>) => {
    const { link, useWalkMeSdk } = item;
    if (useWalkMeSdk) {
      handleWalkmeSDKClick(item);
    } else if (link) {
      handleLinkClick(link);
    }
  };

  return { handleLinkClick, handleWalkmeSDKClick, handleListItemClick };
}
