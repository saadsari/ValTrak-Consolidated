import { MapContainer, TileLayer } from 'react-leaflet'
import { useState,useEffect } from 'react';
import RenderedMarker, { MarkerData } from '../ui/rendered-marker';
import VideoModal from './videomodal';


interface MapProps {
    selectedAgent: string | null;
  }
export default function HavenMap({selectedAgent}:MapProps) {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    useEffect(() => {
        const fetchMarkers = async () => {
          try {
            const response = await fetch(`http://3.15.142.101:5000/lineupdata?map=haven&agent=${selectedAgent}`);
            if (!response.ok) {
              throw new Error('Failed to fetch markers');
            }
            const data = await response.json();
            console.log(data);
            setMarkers(data); // Assuming data is an array of marker objects
          } catch (error) {
            console.error('Error fetching marker data react:', error);
            // Handle error as needed
          }
        };
    
        if (selectedAgent) {
          fetchMarkers();
        }
      }, [selectedAgent]);
      const handleMarkerClick = (videoUrl: string) => {
        setCurrentVideoUrl(videoUrl);
        setModalOpen(true);
      };
    return (
        <>
        <MapContainer style={{ height:"700px", width: "700px", backgroundColor:"dark blue",marginTop:"180px", marginBottom:'90px'
    }}
                      center={[0, 0]} 
                      zoomControl={false} 
                      zoom={2} 
                      scrollWheelZoom={false} 
                      maxBounds={[[-80,-120],[75,120]]} 
                      doubleClickZoom={false}  >
        <TileLayer
          attribution='&copy; <a href="https://valorantmaps.wordpress.com/">Wordpress</a> contributors'
          url={'/Haven/{z}/{x}/{y}.png'}
        />
        {markers.map((marker, index) => (
        <RenderedMarker key={index} 
                        markerData={marker} 
                        onClick={() => handleMarkerClick(marker.youtubeLink)} />
      ))}
      </MapContainer>
      <VideoModal
        videoUrl={currentVideoUrl}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      </>
    )
  }