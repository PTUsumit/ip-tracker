"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ lat, lng }) {
    return (
        <MapContainer center={[lat, lng]} zoom={13} className="h-[400px] w-full rounded-md shadow-lg">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]}>
                <Popup>IP Location</Popup>
            </Marker>
        </MapContainer>
    );
}
