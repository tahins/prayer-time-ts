import React, { FunctionComponent, useContext } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrayerTime from "./Components/PrayerTime/PrayerTime";
import LocationPermission from "./Components/LocationPermission/LocationPermission";
import Settings from "./Components/Settings/Settings";
import UtilService from "./Services/util.service";
import { PositionContextProvider, PositionContext } from "./Contexts/position.context";
import { PlaceContextProvider } from "./Contexts/place.context";
import { SettingsContextProvider } from "./Contexts/settings.context";

import "./App.css";

const App: FunctionComponent = () => {
  return (
    <PositionContextProvider>
      <PlaceContextProvider>
        <SettingsContextProvider>
          <AppRouter />
        </SettingsContextProvider>
      </PlaceContextProvider>
    </PositionContextProvider>
  );
}

export default App;

const AppRouter: FunctionComponent = () => {
  const routerRef = React.createRef<Router>();
  const positionContext = useContext(PositionContext);
  const isCoordsSet = positionContext.isCoordsSet();
  const baseUrl = UtilService.getBaseUrl();

  return (
    <div className="App">
      <Router ref={routerRef}>
        <Route path={baseUrl + "/"} component={isCoordsSet ? PrayerTime : LocationPermission} />
        <Route path={baseUrl + "/settings"} component={Settings} />
        {/* <NotFound handler={LocationPermission} /> */}
      </Router>
    </div>
  );
}
