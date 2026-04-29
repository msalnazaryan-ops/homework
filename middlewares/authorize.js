export function authorize(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        req.user = {
            id: 'test-user-id'
        };

        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }
}