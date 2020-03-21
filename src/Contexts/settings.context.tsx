import React, { useState } from "react";
import { Settings } from "../@types/Settings";
import LocalStorageService from "../Services/localstorage.service";

import defaultSettingsData from "../Components/Settings/SettingsData.json";

type SettingsContext = {
    settings: Settings,
    selectedOptions: { [key: string]: any },
    getSelectedOption: (settingsKey: string, selectedKey: string) => string,
    setSelectedOptions: (selectedOptions: any) => void
    setSettings: (settingsKey: string, selectedOptionKey: string) => void
}

interface ISettingsContextProps {
    children: any
}

const initialSettingsContextValue: SettingsContext = {
    settings: defaultSettingsData,
    setSettings: () => {},
    selectedOptions: {},
    getSelectedOption: () => "",
    setSelectedOptions: () => {}
};
const SettingsContext = React.createContext<SettingsContext>(initialSettingsContextValue);

function SettingsContextProvider(props: ISettingsContextProps) {
    let settingsDataFromStorage = LocalStorageService.getSettingsFromStorage();
    let initialSettingsContextData = settingsDataFromStorage || initialSettingsContextValue.settings;
    let [settingsData, setSettingsDataInState] = useState(initialSettingsContextData);

    // const getSelectedOption = (settingsKey: string, selectedOptionKey: string) => {
    //     return initialSettingsContextValue.settings[settingsKey].options[selectedOptionKey];
    // }

    // if (!defaultSelectedOptions) {
    //     defaultSelectedOptions = {};
    //     settingsKeys.forEach(settingsKey => {
    //         let optionKey = defaultSettingsData[settingsKey].defaultOptionKey;
    //         let option = getSelectedOption(settingsKey, optionKey);

    //         defaultSelectedOptions[settingsKey] = { optionKey, option };
    //     });
    // }

    const setSettingsData = (settingsKey: string, selectedOptionKey: string) => {
        settingsData[settingsKey].selectedOptionKey = selectedOptionKey;
        setSettingsDataInState(settingsData);
    };

    return <SettingsContext.Provider
        value={{
            settings: settingsData,
            setSettings: setSettingsData,
            selectedOptions: {},
            getSelectedOption: () => "",
            setSelectedOptions: () => {}
        }}>
        {props.children}
    </SettingsContext.Provider>
}



export { SettingsContextProvider, SettingsContext };
