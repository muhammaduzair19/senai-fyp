import jwt from "jsonwebtoken";

// admin authentication
const authAdmin = (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.json({ success: false, message: "NOT AUTHORIZED" });
        }

        const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);

        if (
            decodedToken !==
            process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        ) {
            return res.json({ success: false, message: "Invalid token" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message });
    }
};

export default authAdmin;
