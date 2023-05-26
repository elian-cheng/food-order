import React, { useCallback } from 'react';
import { DirectionsService, DirectionsServiceProps } from '@react-google-maps/api';
import { center } from './constants';

interface ServiceProps {
  address: google.maps.LatLng;
  setRoute: (result: google.maps.DirectionsResult | null) => void;
}

function Service({ address, setRoute }: ServiceProps) {
  const onServiceLoad = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === 'OK' && result) {
        setRoute(result);
      } else {
        console.log(status);
      }
    },
    [setRoute]
  );

  const directionsServiceOptions: DirectionsServiceProps = {
    options: {
      origin: center.shop,
      destination: address,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    callback: onServiceLoad,
  };

  return <DirectionsService {...directionsServiceOptions} />;
}

export default React.memo(Service);
