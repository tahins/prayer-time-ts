import React, { useContext } from "react";
import { PositionContext } from "../../Contexts/position.context";
import { PlaceContext } from "../../Contexts/place.context";
import LocationService from "../../Services/location.service";
import { Icon } from 'react-icons-kit';
import { crosshair } from 'react-icons-kit/feather/crosshair';

import "./LocationPermission.css";

function LocationPermission() {
  const locationService = new LocationService();
  const positionContext = useContext(PositionContext);
  const placeContext = useContext(PlaceContext);

  return (
    <div id="noLocation">
      <p><strong>Assalamu'alaikum</strong>,</p>
      <p>We cannot show you prayer times without knowing where you are.</p>
      <br />
      <button className="primary large shadow" onClick={() => {
        getUserLocationAndPlaceHandler(locationService, positionContext, placeContext);
      }}>
        <Icon icon={crosshair} size={16} />Share my location
      </button>
    </div>
  );
}

export default LocationPermission;

const getUserLocationAndPlaceHandler = async (locationService: LocationService,
  positionContext: PositionContext, placeContext: PlaceContext) => {
    let coords = await locationService.getPosition();
    positionContext.setCoords(coords);
    await getUserPlaceHandler(locationService, placeContext);
};

const getUserPlaceHandler = async (locationService: LocationService, placeContext: PlaceContext) => {
  let place = await locationService.getPlace();
  placeContext.setPlace(place);
};
