import { supabase } from "../config.js";
import { getUserIdFromRequest } from "../utils/auth.js";

export const addContactsUs = async (request, h) => {
    try {
        const user_id = getUserIdFromRequest(request);
        const { name, email, message } = request.payload;

        if (!name || !email || !message) {
            return h.response({ error: "Nama, email, dan pesan wajib diisi." }).code(400);
        }

        const { error } = await supabase
            .from('contact_us')
            .insert([{ user_id, name, email, message }]);

        if (error) return h.response({ error: error.message }).code(400);

        return h.response({ message: "Pesan berhasil dikirim." }).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};