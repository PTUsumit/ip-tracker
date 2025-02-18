"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getIPDetails } from "@/lib/ipify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IPTracker() {
    const [ip, setIp] = useState("");
    const [ipData, setIpData] = useState(null);

    useEffect(() => {
        getIPDetails().then(setIpData);
    }, []);

    const handleSearch = async () => {
        if (!ip) return;
        const data = await getIPDetails(ip);
        setIpData(data);
    };

    return (
        <div className="flex flex-col items-center p-6 w-full max-w-4xl">
            {/* Header */}
            <div className="bg-blue-500 text-white text-center p-6 w-full rounded-md">
                <h1 className="text-xl font-bold">IP Address Tracker</h1>
                <div className="flex mt-4 max-w-lg mx-auto">
                    <Input
                        className="p-2 rounded-l-md border flex-grow"
                        placeholder="Enter IP Address"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                    />
                    <Button className="rounded-r-md bg-black text-white" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>

            {/* Display IP Info */}
            {ipData && (
                <div className="bg-white p-6 rounded-md shadow-lg mt-4 w-full max-w-4xl">
                    <p><strong>IP Address:</strong> {ipData.ip}</p>
                    <p><strong>Location:</strong> {ipData.location.city}, {ipData.location.region}, {ipData.location.country}</p>
                    <p><strong>Timezone:</strong> UTC {ipData.location.timezone}</p>
                    <p><strong>ISP:</strong> {ipData.isp}</p>
                </div>
            )}

            {/* Leaflet Map - Wider Area */}
            {ipData && (
                <div className="w-full max-w-4xl mt-4">
                    <MapContainer 
                        center={[ipData.location.lat, ipData.location.lng]} 
                        zoom={13} 
                        className="h-[400px] w-full rounded-md shadow-lg"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[ipData.location.lat, ipData.location.lng]}>
                            <Popup>IP: {ipData.ip}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>
    );
}
