import React, { useState } from 'react';
import LocalStorageService from "../Services/localstorage.service";
import { Place } from "../@types/Place";

type PlaceContext = {
    place: Place,
    setPlace: (place: Place) => void,
    isPlaceSet: () => boolean,
    getPlaceName: () => string
}

interface IPlaceContextProps {
    children: any
}

const initialPlaceContext = {
    place: {
        city: '',
        country: ''
    },
    setPlace: () => { },
    isPlaceSet: () => false,
    getPlaceName: () => ""
};
const PlaceContext = React.createContext<PlaceContext>(initialPlaceContext);

function PlaceContextProvider(props: IPlaceContextProps) {
    let initialPlace: Place = LocalStorageService.getPlace();
    if (!initialPlace) {
        initialPlace = {
            city: '',
            country: ''
        }
    }

    let [place, setPlaceInState] = useState<Place>(initialPlace);

    return <PlaceContext.Provider
        value={{
            place,
            setPlace: (place: Place) => {
                LocalStorageService.setPlace(place);
                setPlaceInState(place);
            },
            isPlaceSet: () => place.city !== '' && place.country !== '',
            getPlaceName: () => place.city + ", " + place.country
        }}>
        {props.children}
    </PlaceContext.Provider>
}

export { PlaceContextProvider, PlaceContext };
