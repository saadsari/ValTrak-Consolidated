import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';

interface AscentMapFormProps {
  greenMarker: [number, number] | null;
  setGreenMarker: (pos: [number, number] | null) => void;
  redMarker: [number, number] | null;
  setRedMarker: (pos: [number, number] | null) => void;
  updateFormMarkers: (greenMarker: [number, number] | null, redMarker: [number, number] | null) => void;
}

export default function AscentMapForm({ greenMarker, setGreenMarker, redMarker, setRedMarker,updateFormMarkers }: AscentMapFormProps) {
  const [clickCount, setClickCount] = useState(0);

  const greenIcon = L.divIcon({ className: 'leaflet-div-icon-green' });
  const redIcon = L.divIcon({ className: 'leaflet-div-icon-red' });

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (clickCount < 2) {
          const { lat, lng } = e.latlng;
          if (clickCount === 0) {
            setGreenMarker([lat, lng]);
            updateFormMarkers([lat, lng], redMarker);
          } else if (clickCount === 1) {
            setRedMarker([lat, lng]);
            updateFormMarkers(greenMarker, [lat, lng]);
          }
          setClickCount(clickCount + 1);
        }
      }
    });
    return null;
  };

  return (
    <MapContainer style={{ cursor: 'crosshair',height:"700px", width: "700px", backgroundColor:"dark blue"}}
                      center={[0, 0]} 
                      zoomControl={false} 
                      zoom={2} 
                      scrollWheelZoom={false} 
                      maxBounds={[[-80,-120],[75,120]]}     
                      doubleClickZoom={false}  >
      <TileLayer
        attribution='&copy; <a href="https://valorantmaps.wordpress.com/">Wordpress</a> contributors'
        url={'Ascent/{z}/{x}/{y}.png'}
      />
      {greenMarker && (
        <Marker position={greenMarker} icon={greenIcon}>
          <Popup>Your Starting Position</Popup>
        </Marker>
      )}
      {redMarker && (
        <Marker position={redMarker} icon={redIcon}>
          <Popup>Utility Destination</Popup>
        </Marker>
      )}
      <MapEvents />
    </MapContainer>
  );
}
