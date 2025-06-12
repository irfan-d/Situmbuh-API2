import { supabase } from "../config.js";

export const getAllBidanHandler = async (request, h) => {
    try {
        const { data, error } = await supabase
            .from('bidan')
            .select('id, nama, pendidikan, tempat_praktik, rating, foto_url, latitude, longitude, harga, jadwal_praktik');
        if (error) return h.response({ error: error.message }).code(400);
        return h.response(data).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};