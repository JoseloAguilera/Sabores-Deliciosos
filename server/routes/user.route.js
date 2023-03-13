
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");


module.exports = (app) => {
    app.post("/users", userController.nuevoUser);
    app.get("/users/me", auth, userController.getPerfil);
}