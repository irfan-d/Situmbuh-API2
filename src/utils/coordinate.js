import axios from "axios";

export async function getCoordinates(address) {
    const query = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    const response = await axios.get(url, { headers: { 'User-Agent': 'situmbuh-app' } });
    const data = response.data;
    if (data && data[0]) {
        return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
    }
    return { latitude: null, longitude: null };
};