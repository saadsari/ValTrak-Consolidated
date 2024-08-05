
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
export default function LeafletMap() {
    
    return (
        <div>
        <MapContainer style={{ height:"700px", width: "700px", backgroundColor:"dark blue",marginTop:"180px", marginBottom:'90px'
    }}center={[0, 0]} zoomControl={false} zoom={2} scrollWheelZoom={false} maxBounds={[[-80,-120],[75,120]]} doubleClickZoom={false}  >
        <TileLayer
          attribution='&copy; <a href="https://valorantmaps.wordpress.com/">Wordpress</a> contributors'
          url={'../../public/Bind/{z}/{x}/{y}.png'}
        />
        <Marker position={[-80,-120]}>
          <Popup>
            southwest corner
          </Popup>
        </Marker> 
        <Marker position={[75,120]}>
          <Popup>
            northeast corner
          </Popup>
        </Marker> 
      </MapContainer>
      </div>
    )
  }