import React, { useState } from "react";
import LocalStorageService from "../Services/localstorage.service";
import { Coordinate } from "../@types/Coordinate";

type PositionContext = {
    coords: Coordinate,
    setCoords: (coords: Coordinate) => void,
    isCoordsSet: () => boolean
}

interface IPositionContextProps {
    children: any
}

const initialCoords = {
    latitude: 0,
    longitude: 0
};
const initialPositionContextValue = {
    coords: initialCoords,
    setCoords: () => { },
    isCoordsSet: () => false
};

const PositionContext = React.createContext<PositionContext>(initialPositionContextValue);

function PositionContextProvider(props: IPositionContextProps) {
    let initialCoords: Coordinate = LocalStorageService.getPosition();
    if (!initialCoords) {
        initialCoords = {
            latitude: 0,
            longitude: 0
        }
    }

    let [coords, setCoordsInState] = useState<Coordinate>(initialCoords);

    return <PositionContext.Provider
        value={{
            coords,
            setCoords: (coords: Coordinate) => {
                LocalStorageService.setPosition(coords);
                setCoordsInState(coords);
            },
            isCoordsSet: () => coords.latitude !== 0 && coords.longitude !== 0
        }}>
        {props.children}
    </PositionContext.Provider>
}

export { PositionContextProvider, PositionContext };
