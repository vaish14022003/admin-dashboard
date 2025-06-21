
import { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UsersChart from './UsersChart';
import ManagersChart from './ManagersChart';
import OrdersChart from './OrdersChart';
import FeedbackPieChart from './FeedbackPieChart';



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
                                            url: '/car.png',
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

                    <div><UsersChart />
                        <ManagersChart />
</div>

                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                        <OrdersChart />
                        <FeedbackPieChart />
                    </div>

                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
