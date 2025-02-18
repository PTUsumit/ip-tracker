import axios from "axios";

export async function getIPDetails(ip = "") {
    const API_KEY = process.env.NEXT_PUBLIC_IPIFY_API_KEY;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`;
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching IP data:", error);
        return null;
    }
}
