const jwt = require("jsonwebtoken");
require("dotenv").config()
const verification = (req, res, next) => {
	try {
		const checkAuth = req.headers.authorization;
		if (checkAuth) {
			const token = checkAuth.split(" ")[1];
			if (token) {
				jwt.verify(token, process.env.SECRETPASS,(err, payload) => {
					if (err) {
						res.status(500).json({
							message: err.message,
						});
					} else {
						req.user = payload;
						next();
					}
				});
			} else {
				res.status(500).json({
					message: "Check your Token",
				});
			}
		} else {
			res.status(500).json({
				message: "Access Denied",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = verification;