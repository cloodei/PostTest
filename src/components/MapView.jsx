import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapScrollControl = () => {
  const map = useMap();
  useEffect(() => {
    const handleScroll = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        const zoomIn = event.deltaY < 0;
        if (zoomIn) {
          map.zoomIn();
        } else {
          map.zoomOut();
        }
      }
    };

    map.scrollWheelZoom.disable();

    const mapContainer = map.getContainer();
    mapContainer.addEventListener('wheel', handleScroll);

    return () => {
      mapContainer.removeEventListener('wheel', handleScroll);
    };
  }, [map]);

  return null;
};

export default function MapView() {
  const [position, setPosition] = useState([33.9416, -118.0845]); // Default position: Whittier, CA
  const [error, setError] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);
  
  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <MapContainer center={position} scrollWheelZoom={false} zoom={13} style={
          {
            height: '70vh',
            width: '95%', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            border: '1px solid #74747480',
            borderRadius: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 10px'
          }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[33.9416, -118.0845]} icon={redIcon} ref={markerRef}>
            <Popup>13849-13839 El Camino Real, Whittier, CA 90605, USA</Popup>
          </Marker>
          <Marker position={position}>
            <Popup>You are here!</Popup>
          </Marker>
          <MapScrollControl />
        </MapContainer>
      )}
    </div>
  );
};