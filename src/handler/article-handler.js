import axios from "axios";

export const getArticlesHandler = async (request, h) => {
    const topic = request.query.topic || "stunting";
    const apiKey = process.env.NEWSAPI_KEY;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=id&apiKey=${apiKey}`;
    try {
        const response = await axios.get(url);
        return h.response(response.data.articles).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};