const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);
    app.get("/api/users", authenticate, userController.getAll);
    app.delete("/api/user/:id", userController.deleteUser);

    app.post("/api/user/:id/account", authenticate, userController.createAccount);
    app.get("/api/user/:user_id/:account_id", authenticate, userController.getOneAccount);
    app.put("/api/user/:user_id/:account_id", authenticate, userController.updateOneAccount);
    app.delete("/api/user/:user_id/:account_id", userController.deleteOnAccount2);
    // app.delete("/api/user/:id", userController.deleteOneAccount);

    app.get("/api/user/:id", userController.getOne);
}

//When working getAll and any account related routes should have authenticate added