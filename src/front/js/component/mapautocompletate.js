import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import AddressAutocomplete from "./addressautocomplete";
import MapComponent from "./mapcomponet";

export const Mapautocompletate = () => {
    const { store, actions } = useContext(Context);
    const [selectedAddress, setSelectedAddress] = useState(''); 
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleAddressSelect = (address, location) => {
        setSelectedAddress(address);
        setSelectedLocation(location); // Guarda la ubicación
        console.log("Dirección seleccionada:", address);
        console.log("Coordenadas seleccionadas:", location);
    };

    return (
        <>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
            {selectedLocation && (
                <MapComponent initialPosition={selectedLocation} />
            )}
            {selectedLocation && (
                <div>
                    <p>Latitud: {selectedLocation.lat}</p>
                    <p>Longitud: {selectedLocation.lng}</p>
                </div>
            )}
        </>
    );
};
