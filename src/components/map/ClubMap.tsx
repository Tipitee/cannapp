
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Club } from "@/types/club";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDevice } from "@/hooks/use-device";
import { useToast } from "@/hooks/use-toast";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface ClubMapProps {
  clubs: Club[];
  userLocation?: { latitude: number | null; longitude: number | null };
  onMarkerClick?: (club: Club) => void;
  height?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

function RecenterMap({ coords, zoom }: { coords?: [number, number]; zoom?: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.setView(coords, zoom || map.getZoom());
    }
  }, [coords, zoom, map]);
  
  return null;
}

export function ClubMap({
  clubs,
  userLocation,
  onMarkerClick,
  height = "100vh",
  initialCenter = [51.1657, 10.4515], // Germany center
  initialZoom = 6
}: ClubMapProps) {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const mapRef = useRef<L.Map | null>(null);
  const { toast } = useToast();

  const handleMarkerClick = (club: Club) => {
    if (onMarkerClick) {
      onMarkerClick(club);
    } else {
      navigate(`/clubs/${club.id}`);
    }
  };

  const getUserLocationMarker = () => {
    if (userLocation?.latitude && userLocation?.longitude) {
      const userIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      return (
        <Marker 
          position={[userLocation.latitude, userLocation.longitude]} 
          icon={userIcon}
        >
          <Popup>
            <div className="text-center">
              <p className="font-semibold">Your Location</p>
            </div>
          </Popup>
        </Marker>
      );
    }
    return null;
  };

  const findNearby = () => {
    if (userLocation?.latitude && userLocation?.longitude && mapRef.current) {
      mapRef.current.setView([userLocation.latitude, userLocation.longitude], 12);
      toast({
        title: "Showing clubs near you",
        description: "We've centered the map on your current location",
      });
    } else {
      toast({
        title: "Location unavailable",
        description: "Please enable location services to use this feature",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative w-full" style={{ height }}>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        ref={mapRef}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        
        {clubs.map((club) => (
          <Marker
            key={club.id}
            position={[club.latitude, club.longitude]}
            eventHandlers={{ click: () => handleMarkerClick(club) }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold">{club.name}</h3>
                <p className="text-sm text-muted-foreground">{club.city}</p>
                <div className="flex items-center mt-1">
                  <span className="text-amber-500 text-sm">★ {club.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground ml-1">({club.reviewCount})</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => navigate(`/clubs/${club.id}`)}
                >
                  View Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {getUserLocationMarker()}
        {userLocation?.latitude && userLocation?.longitude && 
          <RecenterMap 
            coords={[userLocation.latitude, userLocation.longitude]} 
            zoom={12}
          />
        }
      </MapContainer>
      
      {isMobile && (
        <div className="absolute bottom-24 right-4 z-[1000]">
          <Button 
            onClick={findNearby} 
            className="rounded-full shadow-lg bg-white text-black hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <span className="sr-only">Find Nearby</span>
          </Button>
        </div>
      )}
    </div>
  );
}
