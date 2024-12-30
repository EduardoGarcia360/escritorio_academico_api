import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    // Obtener el token desde las cookies
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({ status: 'ERROR', message: 'Acceso no autorizado: Token no proporcionado' });
    }

    try {
        // Verificar el token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(403).json({ status: 'ERROR', message: 'El token ha expirado' });
                }
                return res.status(403).json({ status: 'ERROR', message: 'Token inválido' });
            }
    
            req.user = user; // Si el token es válido, agregamos el usuario a la solicitud
            next(); // Continuamos al siguiente middleware o controlador
        });
    } catch (error) {
        return res.status(403).json({ status: 'ERROR', message: 'Token inválido o expirado' });
    }
};
