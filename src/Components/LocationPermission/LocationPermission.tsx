import React, { useContext } from "react";
import { PositionContext } from "../../Contexts/position.context";
import { PlaceContext } from "../../Contexts/place.context";
import LocationService from "../../Services/location.service";
import LocationPermissionView from "./LocationPermissionView";

function LocationPermission() {
  const locationService = new LocationService();
  const positionContext = useContext(PositionContext);
  const placeContext = useContext(PlaceContext);
  const getUserLocationAndPlace = getUserLocationAndPlaceHandler(
    locationService, positionContext, placeContext
  );

  return <LocationPermissionView getUserLocationAndPlace={getUserLocationAndPlace} />;
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
