
export const rootHandler = async (request, h) => {
    return h.response({
        status: "succes",
        message: 'Welcome to Situmbuh API'
    }).code(200)
}