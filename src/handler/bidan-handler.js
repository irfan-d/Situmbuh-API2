import { supabase } from "../config.js";

export const getAllBidanHandler = async (request, h) => {
    try {
        const { data, error } = await supabase
            .from('bidan')
            .select('id, nama, pendidikan, tempat_praktik, rating, foto_url, latitude, longitude, harga, jadwal_praktik, no_str');
        if (error) return h.response({ error: error.message }).code(400);
        return h.response(data).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

export const getBidanDetailHandler = async (request, h) => {
    try {
        const { id } = request.params;
        const { data, error } = await supabase
            .from('bidan')
            .select('id, nama, pendidikan, tempat_praktik, rating, foto_url, latitude, longitude, harga, jadwal_praktik, no_str')
            .eq('id', id)
            .single();

        if (error || !data) return h.response({ error: "Bidan tidak ditemukan" }).code(404);
        return h.response(data).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};