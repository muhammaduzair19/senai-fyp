import jwt from "jsonwebtoken";

// doctor authentication
const authDoctor = (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.json({ success: false, message: "NOT AUTHORIZED" });
        }

        const decodedToken = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.body.docId = decodedToken.id;

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message });
    }
};

export default authDoctor;
