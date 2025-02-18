export async function getIPDetails(ip = "") {
    const API_KEY = process.env.NEXT_PUBLIC_IPIFY_API_KEY;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${ip ? `&ipAddress=${ip}` : ""}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch IP details");
        return await response.json();
    } catch (error) {
        console.error("Error fetching IP data:", error);
        return null;
    }
}
