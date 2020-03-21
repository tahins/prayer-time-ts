export type Settings = {
    [key: string]: SettingsItem
}

type SettingsItem = {
    "description": string,
    "defaultOptionKey": string,
    "selectedOptionKey": string,
    "optionKey": string,
    "options": SettingsOptions
}

type SettingsOptions = {
    [key: string]: SettingsOption
}

type SettingsOption = {
    "name": string,
    "description": string
}