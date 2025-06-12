import { supabase } from '../config.js'
import { getUserIdFromRequest } from '../utils/auth.js'

export const getProfileHandler = async (request, h) => {
    try{
        const user_id = getUserIdFromRequest(request);
        const { data, error } = await supabase
            .from('parent')
            .select('user_id, email, full_name, gender, birth_date, phone_number, job')
            .eq('user_id', user_id)
            .single();
        if(error) return h.response({error: error.message}).code(500)
        return h.response({profile: data}).code(200)
    }
    catch(error){
        return h.response({error: error.message}).code(400)
    }
}

export const addProfileHandler = async (request, h) => {
    try{
        const user_id = getUserIdFromRequest(request)
        const { gender, birth_date, phone_number, job } = request.payload;

        const { error } = await supabase.from('parent').update({
            gender, birth_date, phone_number, job
        }).eq(
            'user_id', user_id
        );

        if(error) return h.response({error: error.message}).code(400);

        return h.response({message: 'Profile berhasil diupdate'}).code(200);
    }
    catch(error){
        return h.response({error: error.message}).code(400);
    }
}

export const putProfileHandler = async(request, h) => {
    try{
        const user_id = getUserIdFromRequest(request)
        const { full_name, gender, phone_number, birth_date, job} = request.payload

        const updateData = {};
        if (gender !== undefined) updateData.gender = gender;
        if (birth_date !== undefined) updateData.birth_date = birth_date;
        if (phone_number !== undefined) updateData.phone_number = phone_number;
        if (job !== undefined) updateData.job = job;
        if (full_name !== undefined) updateData.full_name = full_name;

        const { error } = await supabase
        .from('parent')
        .update(updateData)
        .eq('user_id', user_id);

        if(error) return h.response({error: error.message}).code(400)

        return h.response({message: 'Profile berhasil diupdate'}).code(200)
    }
    catch(error){
        return h.response({error: error.message}).code(400)
    }
}