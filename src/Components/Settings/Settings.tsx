import React, { useContext } from 'react';
import UtilService from "../../Services/util.service";
import { SettingsContext } from "../../Contexts/settings.context";
import SettingsView from "./SettingsView";

function Settings() {
    const settingsContext = useContext(SettingsContext);
    let settingsKeys = Object.keys(settingsContext.settings);
    const homepageUrl = UtilService.getBaseUrl() + "/";

    const selectionHandler = (settingsKey: string, selectedKey: string) => {
        let selectedOptions = { ...settingsContext.selectedOptions };
        selectedOptions[settingsKey] = {
            optionKey: selectedKey,
            option: settingsContext.getSelectedOption(settingsKey, selectedKey)
        };
        settingsContext.setSelectedOptions(selectedOptions);
    };

    return <SettingsView
        homepageUrl={homepageUrl}
        settingsData={settingsContext.settings}
        settingsKeys={settingsKeys}
        // selectedOptions={settingsContext.selectedOptions}
        handleSelect={selectionHandler}
    />
}

export default Settings;

