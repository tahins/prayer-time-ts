import React, { useContext } from 'react';
import UtilService from "../../Services/util.service";
import { SettingsContext } from "../../Contexts/settings.context";
import SettingsView from "./SettingsView";

function Settings() {
    const settingsContext = useContext(SettingsContext);
    let settingsKeys = Object.keys(settingsContext.settings);
    const homepageUrl = UtilService.getBaseUrl() + "/";

    return <SettingsView
        homepageUrl={homepageUrl}
        settingsData={settingsContext.settings}
        settingsKeys={settingsKeys}
        userPreference={settingsContext.userPreference}
        handleSelect={settingsContext.saveUserPreferenceItem}
    />
}

export default Settings;

