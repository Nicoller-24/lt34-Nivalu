import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',  // Cambiado a 300px de ancho
  height: '300px'  // Cambiado a 200px de alto
};

const SingleMapComponent = ({ initialPosition, onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(initialPosition);
  const mapRef = useRef(null);

  useEffect(() => {
    if (initialPosition) {
      setMarkerPosition(initialPosition);
      if (mapRef.current) {
        mapRef.current.panTo(initialPosition); // Pan to the new position
      }
    }
  }, [initialPosition]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMapClick = (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarkerPosition(newPosition);
    if (onLocationSelect) onLocationSelect(newPosition); 
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> 
      <GoogleMap
        mapContainerStyle={containerStyle}
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
