import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import leaflet CSS

// Import marker images using ES modules
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for the default marker icon issue in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icon for location marker
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid black;"></div>`,
    iconSize: [30, 30], // Adjust size as needed
    iconAnchor: [15, 30], // Adjust anchor as needed
  });
};

// Component to fit all markers in view
const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds); // Adjust the map to fit all markers in view
    }
  }, [locations, map]);

  return null;
};

const MapComponent = ({ lat = 9.082, long = 8.6753 }) => {
  // Initial state with fixed location and user location
  const [locations, setLocations] = useState([
    { latitude: lat, longitude: long, name: 'Fixed Location', error: null }, // Fixed location
    { latitude: null, longitude: null, name: 'Your Location', error: 'Awaiting user location...' } // User's location
  ]);

  // Update locations state when lat and long props change
  useEffect(() => {
    setLocations(prevLocations => [
      { latitude: lat, longitude: long, name: 'Fixed Location', error: null }, // Update fixed location with new lat/long
      prevLocations[1] // Keep the user's location the same
    ]);
  }, [lat, long]);

  useEffect(() => {
    let watchId;

    const getLocation = async () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Update only the second location (user's location)
            setLocations((prevLocations) => [
              prevLocations[0], // Keep the first (fixed) location the same
              { latitude, longitude, name: 'Your Location', error: null } // Update the second (user's location)
            ]);
          },
          (error) => {
            setLocations((prevLocations) => [
              prevLocations[0], // Keep the first (fixed) location the same
              { latitude: null, longitude: null, name: 'Your Location', error: error.message } // Update the second with an error
            ]);
          },
          {
            enableHighAccuracy: true, // Enables high-accuracy GPS
            timeout: 10000, // Max wait time to get location
            maximumAge: 0 // Always fetch fresh location data
          }
        );
      } else {
        setLocations((prevLocations) => [
          prevLocations[0], // Keep the first (fixed) location the same
          { latitude: null, longitude: null, name: 'Your Location', error: 'Geolocation is not supported by this browser.' }
        ]);
      }
    };

    getLocation();

    // Clean up the watchPosition listener when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', border: '1px solid blue' }}>
      <MapContainer
        center={[lat, long]} // Initial center, which now updates with prop changes
        zoom={10} // Set zoom level
        style={{ height: '350px', width: '100%' }}
      >
        {/* This will fit all markers into the map view */}
        <FitBounds locations={locations.filter(loc => loc.latitude && loc.longitude)} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Loop through locations and render markers */}
        {locations.map((location, index) => (
          location.latitude && location.longitude ? (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={createCustomIcon(location.name === 'Your Location' ? 'red' : 'blue')} // Change color based on location type
            >
              <Popup>
                <span>{location.name}</span>
                {location.name === 'Your Location' && (
                  <div style={{ fontSize: '12px', marginTop: '5px', color: 'blue' }}>
                    <strong>You're here</strong>
                  </div>
                )}
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;