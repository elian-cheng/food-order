import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import shopIcon from '../../../../../assets/icons/shopIcon.svg';
import { containerStyle, center, options } from './constants';
import DirectionsService from './DirectionsService';
import DirectionsRenderer from './DirectionsRenderer';

function Map() {
  const [address, setAddress] = useState<google.maps.LatLng | null>(null);
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center.current}
      zoom={9}
      options={options}
      onLoad={() => {
        setTimeout(() => {
          setIsLoaded(true);
        }, 50);
      }}
      onDblClick={({ latLng }) => {
        setAddress(latLng);
      }}
    >
      {isLoaded && <Marker visible={!address} icon={shopIcon} position={center.shop} />}
      {address && <Marker position={address} />}
      {address !== null && <DirectionsService address={address} setRoute={setRoute} />}

      {route !== null && <DirectionsRenderer route={route} />}

      <p
        style={{
          width: '100%',
          backgroundColor: '#fff',
          color: '#ff6000',
          position: 'absolute',
          opacity: '0.85',
          textAlign: 'center',
        }}
      >
        Double click to set your address
      </p>
    </GoogleMap>
  );
}

export default React.memo(Map);
