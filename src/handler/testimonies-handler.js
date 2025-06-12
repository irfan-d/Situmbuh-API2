import { supabase } from "../config.js";
import { getUserIdFromRequest } from "../utils/auth.js";

export const addTestimoniHandler = async (request, h) => {
    try {
        const user_id = getUserIdFromRequest(request);
        const { bidan_id, content, rating } = request.payload;

        const { error } = await supabase
            .from('testimonies')
            .insert([{ user_id, bidan_id, content, rating }]);

        if (error) return h.response({ error: error.message }).code(400);
        return h.response({ message: "Testimoni berhasil ditambahkan" }).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

export const getTestimoniesByBidanHandler = async (request, h) => {
    try {
        const bidan_id = request.params.id;
        const { data, error } = await supabase
            .from('testimonies')
            .select('id, user_id, content, rating, created_at')
            .eq('bidan_id', bidan_id)
            .order('created_at', { ascending: false });

        if (error) return h.response({ error: error.message }).code(400);
        return h.response(data).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};