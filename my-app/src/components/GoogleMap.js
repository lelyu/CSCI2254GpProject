import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ apiKey }) => {
    const defaultProps = {
        center: {
            lat: 40.7128, // 纽约市的纬度
            lng: -74.0060, // 纽约市的经度
        },
        zoom: 10, // 缩放级别
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {/* 在这里添加你需要的地图标记或其他元素 */}
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMap;
