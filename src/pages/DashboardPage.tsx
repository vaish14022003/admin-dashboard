


// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Lottie from 'lottie-react';
// import dashboardAnim from '../assets/dashboard-animation.json';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import {useState,useEffect} from 'react';






// const containerStyle = {
//     width: '100%',
//     height: '400px',
//   };



// const DashboardPage = () => {
//     const [driverLat, setDriverLat] = useState(28.6139); // Default fallback
//     const [driverLng, setDriverLng] = useState(77.2090);

//     useEffect(() => {
//         // Later replace this with WebSocket or API fetch
//         setTimeout(() => {
//             setDriverLat(28.6145);
//             setDriverLng(77.2098);
//         }, 3000);
//     }, []);





//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex flex-col flex-grow ml-64">
//                 <Header />
//                 <main className="p-8 bg-gray-50 min-h-screen">
//                     <h2 className="text-3xl font-bold text-blue-800 mb-8">Dashboard Overview</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//                         <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-green-400 hover:scale-105 transition-transform duration-300">
//                             <h3 className="text-lg font-semibold text-green-700 mb-2">Total Revenue</h3>
//                             <p className="text-3xl font-bold text-gray-800">₹1,85,000</p>
//                             <p className="text-sm text-gray-500 mt-1">This month</p>
//                         </div>
//                         <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-indigo-400 hover:scale-105 transition-transform duration-300">
//                             <h3 className="text-lg font-semibold text-indigo-700 mb-2">Top Restaurant</h3>
//                             <p className="text-xl font-medium text-gray-700">Royal Spice</p>
//                             <p className="text-sm text-gray-500 mt-1">Based on orders</p>
//                         </div>
//                         <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-yellow-400 hover:scale-105 transition-transform duration-300">
//                             <h3 className="text-lg font-semibold text-yellow-700 mb-2">Avg Order Value</h3>
//                             <p className="text-2xl font-bold text-gray-800">₹144.53</p>
//                             <p className="text-sm text-gray-500 mt-1">Compared to last month</p>
//                         </div>
//                     </div>

//                     <div className="flex justify-center mt-12">
//                         <div className="bg-white rounded-xl p-6 shadow-lg">
//                             <Lottie animationData={dashboardAnim} className="w-[400px] h-[400px]" />
//                             <p className="text-center mt-4 text-gray-500">Keep tracking your analytics here!</p>
//                         </div>
//                     </div>
//                     <GoogleMap mapContainerStyle={containerStyle} center={{ lat: driverLat, lng: driverLng }} zoom={12}>
//                         <Marker position={{ lat: driverLat, lng: driverLng }} />
//                     </GoogleMap>
                   
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;




//2.Only api_key is here:-

// import { useState, useEffect } from 'react';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Lottie from 'lottie-react';
// import dashboardAnim from '../assets/dashboard-animation.json';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//     width: '100%',
//     height: '400px',
// };

// const center = {
//     lat: 28.6139,
//     lng: 77.2090,
// };

// const DashboardPage = () => {
//     const [driverLat, setDriverLat] = useState(center.lat);
//     const [driverLng, setDriverLng] = useState(center.lng);

//     // ✅ Load Google Maps script
//     const { isLoaded, loadError } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyDSrU1IzmaqdiTAHDF65anQv72nQNyLttI', // 🔁 Replace with your actual key
//     });

//     useEffect(() => {
//         // Simulate driver location update after 3 seconds
//         const timer = setTimeout(() => {
//             setDriverLat(28.6145);
//             setDriverLng(77.2098);
//         }, 3000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loadError) return <div className="text-red-600 text-center">Error loading Google Maps</div>;
//     if (!isLoaded) return <div className="text-center">Loading map...</div>;

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex flex-col flex-grow ml-64">
//                 <Header />
//                 <main className="p-8 bg-gray-50 min-h-screen">
//                     <h2 className="text-3xl font-bold text-blue-800 mb-8">Dashboard Overview</h2>

//                     {/* Stats Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//                         <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-green-400 hover:scale-105 transition-transform duration-300">
//                             <h3 className="text-lg font-semibold text-green-700 mb-2">Total Revenue</h3>
//                             <p className="text-3xl font-bold text-gray-800">₹1,85,000</p>
//                             <p className="text-sm text-gray-500 mt-1">This month</p>
//                         </div>
//                         <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-indigo-400 hover:scale-105 transition-transform duration-300">
//                             <h3 className="text-lg font-semibold text-indigo-700 mb-2">Top Restaurant</h3>
//                             <p className="text-xl font-medium text-gray-700">Royal Spice</p>
//                             <p className="text-sm text-gray-500 mt-1">Based on orders</p>
//                         </div>
//                         <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-yellow-400 hover:scale-105 transition-transform duration-300">
//                             <h3 className="text-lg font-semibold text-yellow-700 mb-2">Avg Order Value</h3>
//                             <p className="text-2xl font-bold text-gray-800">₹144.53</p>
//                             <p className="text-sm text-gray-500 mt-1">Compared to last month</p>
//                         </div>
//                     </div>

//                     {/* Animation */}
//                     <div className="flex justify-center mt-12">
//                         <div className="bg-white rounded-xl p-6 shadow-lg">
//                             <Lottie animationData={dashboardAnim} className="w-[400px] h-[400px]" />
//                             <p className="text-center mt-4 text-gray-500">Keep tracking your analytics here!</p>
//                         </div>
//                     </div>

//                     {/* Google Map */}
//                     <div className="mt-10">
//                         <h3 className="text-xl font-semibold text-gray-700 mb-4">Live Driver Location</h3>
//                         <GoogleMap
//                             mapContainerStyle={containerStyle}
//                             center={{ lat: driverLat, lng: driverLng }}
//                             zoom={12}
//                         >
//                             <Marker position={{ lat: driverLat, lng: driverLng }} />
//                         </GoogleMap>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;


// import { useEffect, useState } from 'react';
// import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
// import Lottie from 'lottie-react';
// import dashboardAnim from '../assets/dashboard-animation.json';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';

// const containerStyle = {
//     width: '100%',
//     height: '100vh',
// };

// const defaultCenter = {
//     lat: 28.6139,
//     lng: 77.2090,
// };

// const deliveryPoints = [
//     { id: 1, name: 'Connaught Place', lat: 28.6315, lng: 77.2167 },
//     { id: 2, name: 'India Gate', lat: 28.6129, lng: 77.2295 },
//     { id: 3, name: 'Red Fort', lat: 28.6562, lng: 77.2410 },
//     { id: 4, name: 'Lotus Temple', lat: 28.5535, lng: 77.2588 },
//     { id: 5, name: 'Qutub Minar', lat: 28.5244, lng: 77.1855 },
// ];

// const DashboardPage = () => {
//     const [driverPos, setDriverPos] = useState(defaultCenter);
//     const [route, setRoute] = useState([]);
//     const [selectedPoint, setSelectedPoint] = useState(null);

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyDSrU1IzmaqdiTAHDF65anQv72nQNyLttI',
//     });

//     // Simulate driver movement
//     useEffect(() => {
//         const moveInterval = setInterval(() => {
//             setDriverPos((prev) => ({
//                 lat: prev.lat + 0.0003,
//                 lng: prev.lng + 0.0003,
//             }));
//         }, 2000);

//         return () => clearInterval(moveInterval);
//     }, []);

//     const handleSelectLocation = (point) => {
//         setSelectedPoint(point);
//         setRoute([driverPos, { lat: point.lat, lng: point.lng }]);
//     };

//     return (
//         <div className="flex bg-gray-900 text-white">
//             <Sidebar />
//             <div className="flex flex-col flex-grow ml-64">
//                 <Header />
//                 <main className="p-6 min-h-screen">
//                     <h2 className="text-3xl font-bold text-blue-300 mb-4">Live Driver Tracking</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Map Section */}
//                         <div className="rounded-xl overflow-hidden shadow-lg">
//                             {isLoaded ? (
//                                 <GoogleMap
//                                     mapContainerStyle={containerStyle}
//                                     center={driverPos}
//                                     zoom={14}
//                                 >
//                                     <Marker
//                                         position={driverPos}
//                                         icon={{
//                                             url: '/food-truck.png',
//                                             scaledSize: new window.google.maps.Size(40, 40),
//                                         }}
//                                     />

//                                     {selectedPoint && (
//                                         <Marker
//                                             position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
//                                             icon={{
//                                                 url: '/man.png',
//                                                 scaledSize: new window.google.maps.Size(40, 40),
//                                             }}
//                                         />
//                                     )}

//                                     {route.length > 1 && (
//                                         <Polyline
//                                             path={route}
//                                             options={{
//                                                 strokeColor: '#3b82f6',
//                                                 strokeOpacity: 0.9,
//                                                 strokeWeight: 4,
//                                                 geodesic: true,
//                                             }}
//                                         />
//                                     )}
//                                 </GoogleMap>
//                             ) : (
//                                 <p className="text-gray-300">Loading Map...</p>
//                             )}
//                         </div>

//                         {/* Delivery Points List */}
//                         <div className="bg-gray-800 rounded-xl p-6 shadow-md h-[100vh] overflow-y-auto">
//                             <h3 className="text-xl font-semibold text-white mb-4">Delivery Locations</h3>
//                             <ul className="space-y-4">
//                                 {deliveryPoints.map((point) => (
//                                     <li
//                                         key={point.id}
//                                         onClick={() => handleSelectLocation(point)}
//                                         className={`p-4 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-200 ${selectedPoint?.id === point.id ? 'bg-blue-700' : 'bg-gray-700'
//                                             }`}
//                                     >
//                                         <h4 className="text-lg font-medium">{point.name}</h4>
//                                         <p className="text-sm text-gray-300">Lat: {point.lat}, Lng: {point.lng}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;
// import { useEffect, useState, useRef } from 'react';
// import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';

// const containerStyle = {
//     width: '100%',
//     height: '100vh',
// };

// const defaultCenter = { lat: 28.6139, lng: 77.2090 };

// const deliveryPoints = [
//     { id: 1, name: 'Connaught Place', lat: 28.6315, lng: 77.2167 },
//     { id: 2, name: 'India Gate', lat: 28.6129, lng: 77.2295 },
//     { id: 3, name: 'Red Fort', lat: 28.6562, lng: 77.2410 },
//     { id: 4, name: 'Lotus Temple', lat: 28.5535, lng: 77.2588 },
//     { id: 5, name: 'Qutub Minar', lat: 28.5244, lng: 77.1855 },
// ];

// const mapOptions = {
//     styles: [
//         { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
//         { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
//         { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
//         {
//             featureType: 'road',
//             elementType: 'geometry',
//             stylers: [{ color: '#304a7d' }],
//         },
//         {
//             featureType: 'water',
//             elementType: 'geometry',
//             stylers: [{ color: '#0e1626' }],
//         },
//     ],
// };

// const DashboardPage = () => {
//     const [driverPos, setDriverPos] = useState(defaultCenter);
//     const [selectedPoint, setSelectedPoint] = useState(null);
//     const [routePath, setRoutePath] = useState([]);
//     const [traveledPath, setTraveledPath] = useState([defaultCenter]);

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyDSrU1IzmaqdiTAHDF65anQv72nQNyLttI',
//     });

//     const animationRef = useRef(null);

//     const handleSelectLocation = (point) => {
//         setSelectedPoint(point);
//         setRoutePath([driverPos, point]);
//         setTraveledPath([driverPos]);

//         if (animationRef.current) clearInterval(animationRef.current);

//         animationRef.current = setInterval(() => {
//             setDriverPos((prev) => {
//                 const dx = point.lat - prev.lat;
//                 const dy = point.lng - prev.lng;
//                 const dist = Math.sqrt(dx * dx + dy * dy);

//                 if (dist < 0.00005) {
//                     clearInterval(animationRef.current);
//                     return point;
//                 }

//                 const speed = 0.0001; // 🐢 Slow movement
//                 const newLat = prev.lat + (dx / dist) * speed;
//                 const newLng = prev.lng + (dy / dist) * speed;
//                 const newPos = { lat: newLat, lng: newLng };

//                 setTraveledPath((prevPath) => [...prevPath, newPos]);

//                 return newPos;
//             });
//         }, 100); // 🐢 Slow update interval
//     };

//     // Shrinking route: from destination to current position
//     const remainingPath = selectedPoint ? [driverPos, selectedPoint] : [];

//     return (
//         <div className="flex bg-gray-900 text-white">
//             <Sidebar />
//             <div className="flex flex-col flex-grow ml-64">
//                 <Header />
//                 <main className="p-6 min-h-screen">
//                     <h2 className="text-3xl font-bold text-blue-300 mb-4">Live Driver Tracking</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Map */}
//                         <div className="rounded-xl overflow-hidden shadow-lg">
//                             {isLoaded ? (
//                                 <GoogleMap
//                                     mapContainerStyle={containerStyle}
//                                     center={driverPos}
//                                     zoom={14}
//                                     options={mapOptions}
//                                 >
//                                     {/* Driver Marker */}
//                                     <Marker
//                                         position={driverPos}
//                                         icon={{
//                                             url: '/car.png',
//                                             scaledSize: new window.google.maps.Size(40, 40),
//                                         }}
//                                     />

//                                     {/* Destination Marker */}
//                                     {selectedPoint && (
//                                         <Marker
//                                             position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
//                                             icon={{
//                                                 url: '/man.png',
//                                                 scaledSize: new window.google.maps.Size(40, 40),
//                                             }}
//                                         />
//                                     )}

//                                     {/* Traveled Path */}
//                                     <Polyline
//                                         path={traveledPath}
//                                         options={{
//                                             strokeColor: '#10b981',
//                                             strokeOpacity: 1,
//                                             strokeWeight: 4,
//                                         }}
//                                     />

//                                     {/* Remaining Route */}
//                                     {remainingPath.length > 1 && (
//                                         <Polyline
//                                             path={remainingPath}
//                                             options={{
//                                                 strokeColor: '#ef4444',
//                                                 strokeOpacity: 0.8,
//                                                 strokeWeight: 3,
//                                                 strokeDasharray: '10,10',
//                                             }}
//                                         />
//                                     )}
//                                 </GoogleMap>
//                             ) : (
//                                 <p className="text-center text-gray-300">Loading Map...</p>
//                             )}
//                         </div>

//                         {/* Location List */}
//                         <div className="bg-gray-800 rounded-xl p-6 shadow-md h-[100vh] overflow-y-auto">
//                             <h3 className="text-xl font-semibold text-white mb-4">Delivery Locations</h3>
//                             <ul className="space-y-4">
//                                 {deliveryPoints.map((point) => (
//                                     <li
//                                         key={point.id}
//                                         onClick={() => handleSelectLocation(point)}
//                                         className={`p-4 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-200 ${selectedPoint?.id === point.id ? 'bg-blue-700' : 'bg-gray-700'
//                                             }`}
//                                     >
//                                         <h4 className="text-lg font-medium">{point.name}</h4>
//                                         <p className="text-sm text-gray-300">Lat: {point.lat}, Lng: {point.lng}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;
import { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = { lat: 28.6139, lng: 77.2090 };

const deliveryPoints = [
    { id: 1, name: 'Delhi High Court', lat: 28.6208, lng: 77.2410 },
    { id: 2, name: 'Sarojini Nagar Market', lat: 28.5766, lng: 77.1990 },
    { id: 3, name: 'Kalkaji Temple', lat: 28.5483, lng: 77.2589 },
    { id: 4, name: 'Akshardham Mandir', lat: 28.6127, lng: 77.2773 },
    { id: 5, name: 'AIIMS Delhi', lat: 28.5665, lng: 77.2090 },
];

const mapOptions = {
    styles: [
        { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#304a7d' }],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0e1626' }],
        },
    ],
};

const DashboardPage = () => {
    const [driverPos, setDriverPos] = useState(defaultCenter);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [routePath, setRoutePath] = useState([]);
    const [traveledPath, setTraveledPath] = useState([defaultCenter]);
    const [eta, setEta] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const animationRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDSrU1IzmaqdiTAHDF65anQv72nQNyLttI',
    });

    const handleSelectLocation = (point) => {
        setSelectedPoint(point);
        setRoutePath([driverPos, point]);
        setTraveledPath([driverPos]);

        const distance = getDistance(driverPos, point);
        const estimatedTime = (distance / 30) * 60; // assuming 30 km/h speed
        setEta(estimatedTime.toFixed(2));

        if (animationRef.current) clearInterval(animationRef.current);

        animationRef.current = setInterval(() => {
            setDriverPos((prev) => {
                const dx = point.lat - prev.lat;
                const dy = point.lng - prev.lng;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 0.00005) {
                    clearInterval(animationRef.current);
                    return point;
                }

                const speed = 0.0001;
                const newLat = prev.lat + (dx / dist) * speed;
                const newLng = prev.lng + (dy / dist) * speed;
                const newPos = { lat: newLat, lng: newLng };

                setTraveledPath((prevPath) => [...prevPath, newPos]);
                return newPos;
            });
        }, 100);
    };

    const getDistance = (a, b) => {
        const R = 6371;
        const dLat = (b.lat - a.lat) * (Math.PI / 180);
        const dLng = (b.lng - a.lng) * (Math.PI / 180);
        const lat1 = a.lat * (Math.PI / 180);
        const lat2 = b.lat * (Math.PI / 180);

        const x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
        return R * y; // in km
    };

    const remainingPath = selectedPoint ? [driverPos, selectedPoint] : [];

    return (
        <div className="flex bg-gray-900 text-white">
            <Sidebar />
            <div className="flex flex-col flex-grow ml-64">
                <Header />
                <main className="p-6 min-h-screen">
                    <h2 className="text-3xl font-bold text-blue-300 mb-4">Live Driver Tracking</h2>

                    <div className="flex flex-col md:flex-row h-[80vh] gap-6">
                        <div className="w-full md:w-1/2 h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                            {isLoaded ? (
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={driverPos}
                                    zoom={14}
                                    options={mapOptions}
                                >
                                    <Marker
                                        position={driverPos}
                                        icon={{
                                            url: '/food-truck.png',
                                            scaledSize: new window.google.maps.Size(40, 40),
                                        }}
                                    />
                                    {selectedPoint && (
                                        <Marker
                                            position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
                                            icon={{
                                                url: '/man.png',
                                                scaledSize: new window.google.maps.Size(40, 40),
                                            }}
                                        />
                                    )}
                                    <Polyline
                                        path={traveledPath}
                                        options={{
                                            strokeColor: '#10b981',
                                            strokeOpacity: 1,
                                            strokeWeight: 4,
                                        }}
                                    />
                                    {remainingPath.length > 1 && (
                                        <Polyline
                                            path={remainingPath}
                                            options={{
                                                strokeColor: '#ef4444',
                                                strokeOpacity: 0.8,
                                                strokeWeight: 3,
                                                strokeDasharray: '10,10',
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            ) : (
                                <p className="text-center text-gray-300 p-4">Loading Map...</p>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 h-full bg-gray-800 rounded-xl p-6 shadow-md overflow-y-auto">
                            <h3 className="text-xl font-semibold text-white mb-4">Delivery Destinations</h3>
                            <input
                                type="text"
                                placeholder="Search location..."
                                className="w-full px-3 py-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <ul className="space-y-4">
                                {deliveryPoints.filter((point) =>
                                    point.name.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((point) => (
                                    <li
                                        key={point.id}
                                        onClick={() => handleSelectLocation(point)}
                                        className={`p-4 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-200 ${selectedPoint?.id === point.id ? 'bg-blue-700' : 'bg-gray-700'
                                            }`}
                                    >
                                        <h4 className="text-lg font-medium">{point.name}</h4>
                                        <p className="text-sm text-gray-300">
                                            Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            {eta && (
                                <div className="mt-6 p-4 rounded bg-blue-800 text-white">
                                    <strong>Estimated Time of Arrival (ETA):</strong> {eta} mins
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
