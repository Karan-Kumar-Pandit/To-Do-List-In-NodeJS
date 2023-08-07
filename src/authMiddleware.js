const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
     const token = req.header('Authorization')?.split(' ')[1];

     if (!token) {
          return res.status(401).json({ status: 'failed', message: 'Access denied. Token missing.' });
     }

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KAY);
          // console.log(decoded);
          req.user = decoded;
          next();
     } catch (error) {
          return res.status(403).json({ status: 'failed', message: 'Invalid token.' });
     }
};

module.exports = authenticateToken;
