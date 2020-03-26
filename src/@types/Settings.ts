export type Settings = {
    [key: string]: SettingsItem
}

type SettingsItem = {
    "description": string,
    "defaultOptionKey": string,
    "options": SettingsOptions
}

export type SettingsOptions = {
    [key: string]: SettingsOption
}

type SettingsOption = {
    "name": string,
    "description": string
}

export type TSettingsContext = {
    settings: Settings,
    userPreference: UserPreference,
    saveUserPreferenceItem: (preferenceKey: string, preferenceValue: string) => void
}

export type UserPreference = {
    [key: string]: string
}