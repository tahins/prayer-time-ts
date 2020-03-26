import React from 'react';
import { Link } from "react-router-dom";

import { Icon } from 'react-icons-kit';
import { home } from 'react-icons-kit/feather/home';

import "./Settings.css";
import {UserPreference} from "../../@types/Settings";

interface ISettingsView {
    homepageUrl: string,
    settingsKeys: string[],
    settingsData: {[key: string]: any},
    userPreference: UserPreference,
    handleSelect: (key: string, value: string) => void
}

function SettingsView(props: ISettingsView) {
    return (
        <div id="settings">
            <Link to={props.homepageUrl} className="settings-icon pull-right">
                <Icon icon={home} size={32} />
            </Link>
            <h1>Settings</h1>
            <br />
            {props.settingsKeys.map(settingsKey => {
                const settingsItem = props.settingsData[settingsKey];
                const settingsOptionKey = props.userPreference[settingsKey] || settingsItem.defaultOptionKey;
                const settingsOptionItem = settingsItem.options[settingsOptionKey];

                return <div key={settingsKey} className={"block " + settingsKey}>

                    <h2>{settingsItem.description}</h2>

                    <h3>{settingsOptionItem.description}</h3>

                    <p>{settingsOptionItem.note}</p>

                    <select value={settingsOptionKey}
                        onChange={event => props.handleSelect(settingsKey, event.target.value)}>
                        {Object.keys(settingsItem.options).map(optionKey => (
                            <option key={optionKey} value={optionKey}>
                                {settingsItem.options[optionKey].name}
                            </option>
                        ))}
                    </select>

                </div>
            })}
            <small>Design credit <a target="_blank" rel="noopener noreferrer"
                href="https://dribbble.com/shots/2743209-Prayer-Time-App">Fimpli</a></small>
        </div>
    );
}

export default SettingsView;