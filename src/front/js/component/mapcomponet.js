import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MapComponent = ({ initialPosition, onLocationSelect }) => {

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
    if (onLocationSelect) onLocationSelect(newPosition); // Update position in parent component
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition || initialPosition} // Center the map on the marker position
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

export default MapComponent;
