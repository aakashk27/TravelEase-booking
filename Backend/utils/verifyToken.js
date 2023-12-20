import jwt from "jsonwebtoken";


// verifyToken function
export const verifyToken = (req, res, next) => {
    const token = req.cookies.user_token;
  
    if (!token) {
        return res.status(401).send("Invalid token");
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        req.user = user;
        next();
    });
}

// verifyUser function
export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
        if (req.user && req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("You are not allowed");
        }
    });
}

//verify Admin function
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,next, () => {
        console.log(req.user.is_Admin);
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("You are not allowed");
        }
    });
}
