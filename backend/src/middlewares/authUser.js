import jwt from "jsonwebtoken";

// user authentication
const authUser = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "NOT AUTHORIZED" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decodedToken.id;

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message });
    }
};

export default authUser;
