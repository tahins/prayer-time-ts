import React, { useState } from "react";
import { TSettingsContext, UserPreference } from "../@types/Settings";
import LocalStorageService from "../Services/localstorage.service";

import defaultSettingsData from "../Components/Settings/SettingsData.json";

interface ISettingsContextProps {
    children: any
}

const initialSettingsContextValue: TSettingsContext = {
    settings: defaultSettingsData,
    userPreference: {},
    saveUserPreferenceItem: () => {}
};

const SettingsContext = React.createContext<TSettingsContext>(initialSettingsContextValue);

function SettingsContextProvider(props: ISettingsContextProps) {
    let userPreferenceFromStorage: UserPreference = LocalStorageService.getUserPreference();
    let initialUserPreference = userPreferenceFromStorage || {};
    let [userPreference, setUserPreference] = useState(initialUserPreference);

    const saveUserPreferenceItem = (preferenceKey: string, preferenceValue: string) => {
        const newUserPreference = {...userPreference, [preferenceKey]: preferenceValue};
        saveUserPreference(newUserPreference);
    };

    const saveUserPreference = (userPreference: UserPreference) => {
        setUserPreference(userPreference);
        LocalStorageService.storeUserPreference(userPreference);
    };

    return <SettingsContext.Provider
        value={{
            settings: defaultSettingsData,
            userPreference,
            saveUserPreferenceItem
        }}>
        {props.children}
    </SettingsContext.Provider>
}

export { SettingsContextProvider, SettingsContext };
