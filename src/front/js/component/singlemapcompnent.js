import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const SingleMapComponent = ({ initialPosition, onLocationSelect, mapSize }) => {
    const [markerPosition, setMarkerPosition] = useState(initialPosition);
    const mapRef = useRef(null);

    // Sincronizar el marcador con la posición inicial
    useEffect(() => {
        if (initialPosition) {
            setMarkerPosition(initialPosition);
            if (mapRef.current) {
                mapRef.current.panTo(initialPosition); // Centrar el mapa
            }
        }
    }, [initialPosition]);

    // Funciones de ciclo de vida del mapa
    const onLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    // Manejar clics en el mapa
    const handleMapClick = (e) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        if (onLocationSelect) onLocationSelect(newPosition); // Pasar la nueva posición al padre
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapSize} // Tamaño dinámico basado en las props
                center={markerPosition || initialPosition}
                zoom={17}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
            >
                {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default SingleMapComponent;
