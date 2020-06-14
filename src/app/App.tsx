import React, { useEffect, createContext, useState } from "react";
import {
  Switch,
  Route,
  HashRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import walkme, { ISdk } from "@walkme/sdk";

import { defaultInitialAppState } from "./consts/app";
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

import "../styles/index.less";
import FooterProgressBar from "./layout/footer-progress-bar/FooterProgressBar";

declare global {
  interface Window {
    walkme: any;
    teachme: any;
  }
}

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

  const setSDK = async () => {
    const platformTypeParam = getUrlParamValueByName("platform");
    const courseIdParam = getUrlParamValueByName("courseId");

    try {
      await walkme.init();
      console.log("WalkMe ready =>", walkme);

      // set walkme global
      window.walkme = walkme;

      // Walkme Guard
      if (walkme) {
        setWalkmeSDK(walkme);
      }

      const teachmeApp = await walkme.apps.getApp("teachme");

      // teachmeApp Guard
      if (!teachmeApp) {
        throw new Error("Something is wrong, No teachmeApp");
      }

      // set teachme global
      window.teachme = teachmeApp;
      const tmCourses = await teachmeApp.getContent();

      let currentCourse = null;

      if (tmCourses) {
        console.log("tmCourses =>", tmCourses);

        currentCourse = tmCourses.find((course: any, index: number) => {
          const courseIdIndex = parseInt(courseIdParam) - 1;
          if (index === courseIdIndex) {
            return course;
          }
        });
      } else {
        throw new Error("Something is wrong, No tmCourses");
      }

      const formSDK = await teachmeApp.getQuiz(currentCourse.quiz.id);

      if (currentCourse && currentCourse.quiz && formSDK) {
        console.log("currentCourse ", currentCourse);
        console.log("quiz ", formSDK);
      } else {
        throw new Error("Something is wrong, No Quiz");
      }

      setAppState({
        ...appState,
        initiated: true,
        platformType: platformTypeParam,
        formSDK,
      });
    } catch (err) {
      if (Boolean(err)) {
        setTimeout(() => {
          setInformationScreen((prev) => {
            return {
              ...prev,
              type: InformationScreenType.Error,
              error: err,
            };
          });
        }, 300);
      }
    }
  };

  /**
   * Initial SDK and
   */
  useEffect(() => {
    setSDK();
  }, []);

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

  return (
    <div className={`app show wrapper`}>
      {informationScreen ? (
        <InformationScreen {...informationScreen} />
      ) : (
        <HashRouter>
          <Route
            render={({ location }) => (
              <AppContext.Provider
                value={{
                  walkmeSDK,
                  appState,
                  setAppState,
                }}
              >
                <Debug />
                <TransitionGroup className="page-transition-group">
                  <CSSTransition
                    key={location.pathname}
                    timeout={300}
                    classNames="fade-in-left"
                  >
                    <>
                      <Switch location={location}>
                        <Route exact path="/" component={WelcomeScreen} />
                        <Route
                          path="/form/:id/:score?"
                          component={FormScreen}
                        />
                        <Route
                          path="/summary/:score?"
                          component={SummaryScreen}
                        />
                      </Switch>
                      <FooterProgressBar />
                    </>
                  </CSSTransition>
                </TransitionGroup>
              </AppContext.Provider>
            )}
          />
        </HashRouter>
      )}
    </div>
  );
}
