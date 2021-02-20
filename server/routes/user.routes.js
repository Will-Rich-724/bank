const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);
    app.get("/api/users", userController.getAll);
    app.delete("/api/user/:id", userController.deleteUser);

    app.post("/api/user/:id/account", userController.createAccount);
    app.get("/api/user/:user_id/:account_id", userController.getOneAccount);
    app.put("/api/user/:user_id/:account_id", userController.updateOneAccount);

    app.get("/api/user/:id", authenticate, userController.getOne);
}

//When working getAll and any account related routes should have authenticate added