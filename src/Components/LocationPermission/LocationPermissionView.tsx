import React from "react";
import { Icon } from 'react-icons-kit';
import { crosshair } from 'react-icons-kit/feather/crosshair';

import "./LocationPermission.css";

interface ILocationPermissionView {
    getUserLocationAndPlace: Promise<void>
}

function LocationPermissionView(props: ILocationPermissionView) {
    return (
        <div id="noLocation">
            <p><strong>Assalamu'alaikum</strong>,</p>
            <p>We cannot show you prayer times without knowing where you are.</p>
            <br />
            <button className="primary large shadow" onClick={() => props.getUserLocationAndPlace}>
                <Icon icon={crosshair} size={16} />Share my location
            </button>
        </div>
    );
}

export default LocationPermissionView;
