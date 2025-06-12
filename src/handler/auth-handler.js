import { supabase } from '../config.js'
import { nanoid } from 'nanoid';

export const registerHandler = async(request, h) => {
    try{
        const id_parent = nanoid(16)
        const {email, password, full_name} = request.payload
        const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
            data: { full_name }
        }
    });
      if (error) return h.response({ error: error.message }).code(400);

      const user_id = data.user?.id;
      if(user_id){
        const {error:parentError} = await supabase.from('parent').insert([{
            id_parent, user_id, email, full_name
        }])
        if(parentError) return h.response({error: parentError.message}).code(400)
      }
      return h.response({ message: 'User berhasil Regristrasi.' }).code(201);
    }
    catch(error){
        return h.response({error: error.message}).code(400)
    }
}

export const loginHandler = async (request, h) => {
    try{ 
        const { email, password } = request.payload;
        const { data, error } = await supabase.auth.signInWithPassword({ 
            email, password 
        });
        if (error) return h.response({ error: error.message }).code(400);
        return h.response({ session: data.session }).code(200);
    }
    catch(error){
        return h.response({error: error.message}).code(400)
    }
}

export const logoutHandler = async (request, h) => {
    try{
        const { error } = await supabase.auth.signOut()
        if(error) return h.response({error: error.message}).code(400)
        return h.response({message: "Anda Berhasil Logout"}).code(200)
    }
    catch(error){
        return h.response({error: error.message}).code(400)
    }
}