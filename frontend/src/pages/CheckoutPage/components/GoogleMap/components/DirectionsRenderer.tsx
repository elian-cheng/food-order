import React, { useState, useCallback } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useAppDispatch } from '../../../../../hooks/redux';
import { setDirections } from '../../../../../store/redux/mapSlice';

interface RendererProps {
  route: google.maps.DirectionsResult;
}

function Renderer({ route }: RendererProps) {
  const dispatch = useAppDispatch();
  const [instance, setInstance] = useState<google.maps.DirectionsRenderer | null>(null);
  const onDirectionLoad = useCallback((directionsRenderer: google.maps.DirectionsRenderer) => {
    setInstance(directionsRenderer);
  }, []);

  const onDirectionsChanged = useCallback(() => {
    if (instance && instance.getDirections() && instance.getDirections()!.routes.length > 0) {
      const endAddress = instance.getDirections()!.routes[0].legs[0].end_address;
      dispatch(setDirections(endAddress));
    }
  }, [instance, dispatch]);

  return (
    <DirectionsRenderer
      options={{
        directions: route,
      }}
      onLoad={onDirectionLoad}
      onDirectionsChanged={onDirectionsChanged}
    />
  );
}

export default React.memo(Renderer);
