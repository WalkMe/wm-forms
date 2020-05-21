import React, { useEffect, createContext, useState } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import walkme, { ISdk } from "@walkme/sdk";

import {
  PLATFORM_ERROR,
  TEACHME_ERROR,
  defaultInitialAppState,
} from "./consts/app";
import { config } from "./config";

import {
  InformationScreenType,
  IInformationScreenData,
} from "./interfaces/information-screen/informationScreen.interface";
import {
  IAppContext,
  IAppState,
} from "./interfaces/walkme-app/walkmeApp.interface";

import useAppManager from "./hooks/useAppManager";
import InformationScreen from "./layout/screens/information-screen/InformationScreen";
import Debug from "./layout/debug/Debug";
import WelcomeScreen from "./layout/screens/welcome-screen/WelcomeScreen";
import SummaryScreen from "./layout/screens/summary-screen/SummaryScreen";
import FormScreen from "./layout/screens/form-screen/FormScreen";
import OverviewScreen from "./layout/screens/overview-screen/OverviewScreen";

import "../styles/index.less";

export const AppContext = createContext<IAppContext | null>(null);

export default function App() {
  const {
    addGuidSpecificStyle,
    getDebugError,
    getUrlParamValueByName,
  } = useAppManager();
  const [walkmeSDK, setWalkmeSDK] = useState({} as ISdk);
  const [appState, setAppState] = useState(defaultInitialAppState as IAppState);
  const { initiated } = appState;
  const [informationScreen, setInformationScreen] = useState({
    type: InformationScreenType.Loading,
  } as IInformationScreenData);

  /**
   * displayDebugInfo
   */
  const displayDebugInfo = () => {
    setAppState((prevAppState) => {
      return {
        ...prevAppState,
        debugError: getDebugError(),
      };
    });
  };

  /**
   * Calls to app method after app state initiated
   */
  useEffect(() => {
    if (initiated) {
      if (config.debug) displayDebugInfo();
      addGuidSpecificStyle();
      setInformationScreen(null as IInformationScreenData);
    }
  }, [initiated]);

  /**
   * Initial SDK and
   */
  useEffect(() => {
    (async () => {
      let timeout;
      let informationScreenData = informationScreen as IInformationScreenData;
      const platformTypeParam = getUrlParamValueByName("platform");
      const teachmeParam = getUrlParamValueByName("teachme");

      if (!platformTypeParam || !teachmeParam) {
        informationScreenData = {
          type: InformationScreenType.NoConnection,
          error: !platformTypeParam ? PLATFORM_ERROR : TEACHME_ERROR,
        };
        setInformationScreen(informationScreenData);
      } else {
        try {
          await walkme.init();
          console.log("WalkMe ready =>", walkme);

          // Walkme Guard
          if (walkme) {
            setWalkmeSDK(walkme);
          }

          const teachme = await walkme.apps.getApp("teachme");

          // TODO: should change
          const tmCourses = await teachme.getContent();
          const currentCourse = tmCourses.find((course: any, index: number) => {
            if (index === 0) {
              return course;
            }
          });

          const { quiz } = currentCourse;

          console.log("quiz ", quiz);

          // Cleanups before set state
          timeout = setTimeout(() => {
            throw new Error(
              `Search timeout, could not get uiTree in ${config.timeoutIfUiTreeNotFound}ms`
            );
          }, config.timeoutIfUiTreeNotFound);

          clearTimeout(timeout);
          setAppState({
            ...appState,
            initiated: true,
            platformType: platformTypeParam,
            form: quiz,
          });
        } catch (err) {
          console.error(err);
          clearTimeout(timeout);
        }
      }
    })();
  }, []);

  return (
    <HashRouter>
      <Route
        render={({ location }) => (
          <div className={`app show wrapper`}>
            {informationScreen ? (
              <InformationScreen {...informationScreen} />
            ) : (
              <AppContext.Provider
                value={{
                  walkmeSDK,
                  appState,
                }}
              >
                <Debug />
                <TransitionGroup className="page-transition-group">
                  <CSSTransition
                    key={location.pathname}
                    timeout={300}
                    classNames="fade-in-left"
                  >
                    <Switch location={location}>
                      <Route exact path="/" component={WelcomeScreen} />
                      <Route path="/form/:id/:score?" component={FormScreen} />
                      <Route
                        path="/summary/:score?"
                        component={SummaryScreen}
                      />
                      <Route path="/overview" component={OverviewScreen} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </AppContext.Provider>
            )}
          </div>
        )}
      />
    </HashRouter>
  );
}
