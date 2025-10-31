import axios from 'axios'
import { nanoid } from 'nanoid'
import { supabase } from '../config.js'
import { validatePredictionPayload } from '../validation/validation.js'
import { getUserIdFromRequest } from '../utils/auth.js'

export const getPredictionHandler = async (request, h) => {
    try{
        const user_id = getUserIdFromRequest(request);
        const { data, error } = await supabase
            .from('prediction_history')
            .select()
            .eq('user_id', user_id)
        if (error) return h.response({ status: 'fail', message: error.message }).code(500);
        return h.response(data).code(200);
    }
    catch(error){
        return h.response({error: error.message}).code(400);
    }
}

export const getPredictionDetailHandler = async (request, h) => {
    try{
        const user_id = getUserIdFromRequest(request);
        const {id} = request.params
        const { data, error } = await supabase
            .from('prediction_history')
            .select()
            .eq('id_prediction', id)
            .eq('user_id', user_id)
            .single()
        if (error) return h.response({ status: 'fail', message: error.message }).code(500);
        return h.response(data).code(200);
    }
    catch(error){
        return h.response({error: error.message}).code(400);
    }
}

export const addPredictionHandler = async (request, h) => {
    const payload = request.payload;
    const id_prediction = nanoid(16);
    const check_date = new Date().toISOString();

    let user_id;
    try{
        user_id = getUserIdFromRequest(request)
    }catch(err){
        return h.response({error: 'Unauthorized'}).code(401)
    }

    const errorPredictionValidation = validatePredictionPayload(request.payload)
    if(errorPredictionValidation){
        return h.response({
            status: 'fail',
            message: errorPredictionValidation
        }).code(400)
    }
    
    try{
        const newPrediction = {
            "Gender": payload.gender,
            "Age": payload.age,
            "Birth Weight": payload.birth_weight,
            "Body Length": payload.body_length,
            "Breastfeeding": payload.breastfeeding
        }

        const predictionInsert = await axios.post('https://web-production-418a.up.railway.app/predict', newPrediction)
        const predictionResult = predictionInsert.data
        
        const { error } = await supabase.from('prediction_history').insert([{
            id_prediction,
            child_name: payload.child_name,
            gender: payload.gender,
            age: payload.age,
            body_length: payload.body_length,
            birth_weight: payload.birth_weight,
            breastfeeding: payload.breastfeeding,
            result: predictionResult.prediction,
            probability: predictionResult.probability,
            check_date,
            user_id
        }]);

        if(error){
            return h.response({ status: 'fail', message: error.message }).code(500);
        }
        
        return h.response(predictionResult).code(200)
    }
    catch(error){
        return h.response({error: error.message}).code(500)
    }
}

export const deletePredictionHandler = async (request, h) => {
    try{
        const {id} = request.params
        const {error} = await supabase
            .from('prediction_history')
            .delete()
            .eq('id_prediction', id)

        if(error){
            return h.response({
                status: 'fail',
                message: error.message
            }).code(500)
        }
        return h.response({
            status: 'success',
            message: 'Data Berhasil Dihapus'
        }).code(200)
    }
    catch(error){
        return h.response({
            status: 'fail',
            message: error.message
        }).code(500)
    }

}
