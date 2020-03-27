import React, {FunctionComponent, useContext} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrayerTime from "./Components/PrayerTime/PrayerTime";
import LocationPermission from "./Components/LocationPermission/LocationPermission";
import Settings from "./Components/Settings/Settings";
import UtilService from "./Services/util.service";
import {PositionContextProvider, PositionContext} from "./Contexts/position.context";
import {PlaceContextProvider} from "./Contexts/place.context";
import {SettingsContextProvider, SettingsContext} from "./Contexts/settings.context";

import "./App.css";

const App: FunctionComponent = () => {
    return (
        <PositionContextProvider>
            <PlaceContextProvider>
                <SettingsContextProvider>
                    <AppRouter/>
                </SettingsContextProvider>
            </PlaceContextProvider>
        </PositionContextProvider>
    );
};

export default App;

const AppRouter: FunctionComponent = () => {
    const routerRef = React.createRef<Router>();
    const positionContext = useContext(PositionContext);
    const settingsContext = useContext(SettingsContext);
    const isCoordsSet = positionContext.isCoordsSet();
    const baseUrl = UtilService.getBaseUrl();
    const themeColor = settingsContext.userPreference.themeColor || settingsContext.settings.themeColor.defaultOptionKey;

    return (
        <div className={`App ${themeColor}`}>
            <Router ref={routerRef}>
                <Route exact path={baseUrl + "/"} component={isCoordsSet ? PrayerTime : LocationPermission}/>
                <Route exact path={baseUrl + "/settings"} component={Settings}/>
                {/* <NotFound handler={LocationPermission} /> */}
            </Router>
        </div>
    );
};
