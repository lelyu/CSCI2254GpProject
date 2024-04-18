import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../css/GoogleMap.css'; 

const GoogleMap = ({ apiKey }) => {
    const defaultProps = {
        center: {
            lat: 40.7128, // NY lat
            lng: -74.0060, // NY longi
        },
        zoom: 10, // zoom level
    };

    return (
        <div className="google-map-container"> 
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {/* add map marker and other elements */}
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMap;
