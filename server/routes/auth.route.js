const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post("/auth", authController.authenticate);
}

