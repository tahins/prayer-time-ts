import AppConfig from "../AppConfig.json";
import { Coordinate } from "../@types/Coordinate";
import { Place } from "../@types/Place";
import {UserPreference} from "../@types/Settings";

export default class LocalStorageService {
    static setPosition(position: Coordinate) {
        return LocalStorageService.set(AppConfig.storageKeys.position, position);
    }
    static getPosition(): Coordinate {
        return LocalStorageService.get(AppConfig.storageKeys.position) as Coordinate;
    }

    static setPlace(place: Place) {
        return LocalStorageService.set(AppConfig.storageKeys.place, place);
    }
    static getPlace(): Place {
        return LocalStorageService.get(AppConfig.storageKeys.place) as Place;
    }

    static storeUserPreference(userPreference: UserPreference) {
        return LocalStorageService.set(AppConfig.storageKeys.selectedSettingsOptions, userPreference);
    }
    static getUserPreference() {
        return LocalStorageService.get(AppConfig.storageKeys.selectedSettingsOptions) as UserPreference;
    }

    static set(key: string, value: string | Object) {
        let stringValue: string;
        if (typeof value === "object") stringValue = JSON.stringify(value);
        else stringValue = value;

        key = LocalStorageService.getKey(key);
        window.localStorage.setItem(key, stringValue);
        return value;
    }
    static get = (key: string) => {
        key = LocalStorageService.getKey(key);
        let value: string | object;
        value = window.localStorage.getItem(key) || '';
        try {
            value = JSON.parse(value);
        } catch (error) { }

        return value;
    };

    static getKey = (key: string) => AppConfig.storagePrefix + "." + key;
}