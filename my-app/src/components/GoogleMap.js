import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import '../css/GoogleMap.css'; 

const GoogleMap = ({ apiKey, zipCode }) => {
    const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Initial center coordinates
    const zoomLevel = 10;

    useEffect(() => {
        if (zipCode) {
            handleGeocode(zipCode);
        }
    }, [zipCode]);

    const handleGeocode = (zipCode) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: zipCode }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                console.log('Geocoded ZIP code coordinates:', lat, lng);
                setMapCenter([lat, lng]); // Update map center
            } else {
                console.error('Geocode error:', status);
            }
        });
    };

    return (
        <div className="google-map-container"> 
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                center={mapCenter} // Use state's center
                defaultZoom={zoomLevel}
            >
                {/* Add map marker and other elements */}
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMap;
