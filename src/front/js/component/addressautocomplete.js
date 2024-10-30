import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const AddressAutocomplete = ({ onAddressSelect }) => {
  const [address, setAddress] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      setAddress(place.formatted_address);
      onAddressSelect(place.formatted_address);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          ref={inputRef}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ingresa tú ciudad"
          style={{ width: '100%', padding: '8px' }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressAutocomplete;
