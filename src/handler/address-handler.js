import axios from "axios";
import { supabase } from "../config.js";
import { nanoid } from "nanoid";
import { getUserIdFromRequest } from "../utils/auth.js";
import { getCoordinates } from "../utils/coordinate.js";

export const addAddress = async (request, h) => {
    try{
        const id_address = nanoid(16)
        const user_id = getUserIdFromRequest(request)
        const { country, province, regency_city, subdistrict, village, street_name, house_number, postal_code } = request.payload
        const fullAddress = `${street_name} ${house_number}, ${village}, ${subdistrict}, ${regency_city}, ${province}, ${country}`;
        const { latitude, longitude } = await getCoordinates(fullAddress);
        if (!latitude || !longitude) {
            return h.response({ error: "Alamat tidak ditemukan di peta. Mohon periksa kembali." }).code(400);
        }

        const { error } = await supabase.from('address').insert([{
            id_address,
            country, 
            province, 
            regency_city, 
            subdistrict, 
            village, 
            street_name, 
            house_number, 
            postal_code,
            user_id,
            latitude,
            longitude
        }])

        if(error) return h.response({error: error.message}).code(400)
        
        return h.response({message: 'Berhasil menambahkan alamat'}).code(200)
    } catch(error){
        return h.response({error: error.message}).code(400)
    }
};

export const getAddress = async (request, h) => {
    try {
        const user_id = getUserIdFromRequest(request);
        const { data, error } = await supabase
            .from('address')
            .select('country, province, regency_city, subdistrict, village, street_name, house_number, postal_code, latitude, longitude')
            .eq('user_id', user_id)
            .single();
        if (error) return h.response({ error: error.message }).code(400);
        return h.response(data).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(400);
    }
};

export const putAddress = async (request, h) => {
    try {
        const user_id = getUserIdFromRequest(request);
        const { country, province, regency_city, subdistrict, village, street_name, house_number, postal_code } = request.payload;

        const updateData = {};
        if (country !== undefined) updateData.country = country;
        if (province !== undefined) updateData.province = province;
        if (regency_city !== undefined) updateData.regency_city = regency_city;
        if (subdistrict !== undefined) updateData.subdistrict = subdistrict;
        if (village !== undefined) updateData.village = village;
        if (street_name !== undefined) updateData.street_name = street_name;
        if (house_number !== undefined) updateData.house_number = house_number;
        if (postal_code !== undefined) updateData.postal_code = postal_code;

        if (
            country !== undefined || province !== undefined || regency_city !== undefined ||
            subdistrict !== undefined || village !== undefined || street_name !== undefined || house_number !== undefined
        ) {
            const fullAddress = `${street_name || ''} ${house_number || ''}, ${village || ''}, ${subdistrict || ''}, ${regency_city || ''}, ${province || ''}, ${country || ''}`;
            const { latitude, longitude } = await getCoordinates(fullAddress);
            updateData.latitude = latitude;
            updateData.longitude = longitude;
        }

        const { error } = await supabase
            .from('address')
            .update(updateData)
            .eq('user_id', user_id);

        if (error) return h.response({ error: error.message }).code(400);
        return h.response({ message: 'Address berhasil di update' }).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(400);
    }
};

export const getNearbyDoctorsHandler = async (request, h) => {
    try {
        const user_id = getUserIdFromRequest(request);

        const { data: address, error } = await supabase
            .from('address')
            .select('latitude, longitude')
            .eq('user_id', user_id)
            .single();

        if (error || !address) {
            return h.response({ error: "Alamat user tidak ditemukan" }).code(404);
        }

        const { latitude, longitude } = address;
        const query = `
            [out:json];
            (
                node["amenity"="doctors"](around:5000,${latitude},${longitude});
                node["healthcare"="midwife"](around:5000,${latitude},${longitude});
            );
            out center;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        const results = (response.data.elements || []).map(el => ({
            name: el.tags.name || "Dokter/Bidan",
            type: el.tags.amenity === "doctors" ? "Dokter" : "Bidan",
            latitude: el.lat,
            longitude: el.lon,
            address: el.tags["addr:full"] || el.tags["addr:street"] || ""
        }));

        return h.response(results).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};