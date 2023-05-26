import React, { useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Loader from '../../../../components/Loader/Loader';
import Map from './components/Map';

const googleMapsApiKey = 'AIzaSyDpg82Si4PH8zX3RYno2CQN71eBC1_8cww';

function GoogleMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
  });

  const renderMap = useMemo(() => <Map />, []);

  if (isLoaded) {
    return renderMap;
  } else if (loadError) {
    return <div>Cant connect to Google Maps, sorry.</div>;
  } else {
    return <Loader />;
  }
}

export default React.memo(GoogleMap);
