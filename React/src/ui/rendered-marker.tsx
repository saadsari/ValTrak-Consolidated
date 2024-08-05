import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useRef } from 'react';

export interface MarkerData {
  youtubeLink: string;
  description: string;
  greenMarker_lat: number;
  greenMarker_long: number;
  redMarker_lat: number;
  redMarker_long: number;
}

interface RenderedMarkerProps {
  markerData: MarkerData;
  onClick: () => void;
}

export default function RenderedMarker({ markerData, onClick }: RenderedMarkerProps) {
  const greenMarkerRef = useRef<L.Marker | null>(null);
  const redMarkerRef = useRef<L.Marker | null>(null);

  const greenIcon = L.divIcon({ className: 'leaflet-div-icon-green' });
  const redIcon = L.divIcon({ className: 'leaflet-div-icon-red' });

  const handleMouseOver = () => {
    if (greenMarkerRef.current && greenMarkerRef.current.getElement()) {
      greenMarkerRef.current.getElement()!.classList.add('highlight');
    }
    if (redMarkerRef.current && redMarkerRef.current.getElement()) {
      redMarkerRef.current.getElement()!.classList.add('highlight');
    }
  };

  const handleMouseOut = () => {
    if (greenMarkerRef.current && greenMarkerRef.current.getElement()) {
      greenMarkerRef.current.getElement()!.classList.remove('highlight');
    }
    if (redMarkerRef.current && redMarkerRef.current.getElement()) {
      redMarkerRef.current.getElement()!.classList.remove('highlight');
    }
  };

  return (
    <>
      <Marker
        position={[markerData.greenMarker_lat, markerData.greenMarker_long]}
        icon={greenIcon}
        eventHandlers={{
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
          click: onClick,
        }}
        ref={greenMarkerRef}
      >
        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
          <div>{markerData.description}</div>
        </Tooltip>
        {/* <Popup>
          {markerData.description}<br />
          <a href={markerData.youtubeLink} target="_blank" rel="noopener noreferrer">Watch</a>
        </Popup> */}
      </Marker>
      <Marker
        position={[markerData.redMarker_lat, markerData.redMarker_long]}
        icon={redIcon}
        eventHandlers={{
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
          click: onClick,
        }}
        ref={redMarkerRef}
      >
        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
          <div>{markerData.description}</div>
        </Tooltip>
        {/* <Popup>
          {markerData.description}<br />
          <a href={markerData.youtubeLink} target="_blank" rel="noopener noreferrer">Watch</a>
        </Popup> */}
      </Marker>
    </>
  );
}
