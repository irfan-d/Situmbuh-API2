import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

export function getUserIdFromRequest(request) {
    const authHeader = request.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) throw new Error('Unauthorized: No token provided');
    try {
        const payload = jwt.verify(token, jwtSecret);
        return payload.sub;
    } catch (err) {
        console.error('JWT error:', err.message);
        throw new Error('Unauthorized: Invalid token');
    }
};