const recetaController = require("../controllers/receta.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
    // Ruta publica
    app.get('/recetas', recetaController.getAllRecipes);
    app.get('/recetas/search/:search', recetaController.searchRecipes);
    app.get('/recetas/:id', recetaController.getRecipeById);

    // Ruta privada
    app.post('/recetas/new', auth, recetaController.createRecipe);
    app.get('/recetas/mis-recetas', auth, recetaController.getMyRecipes);
    app.put('/recetas/edit/:id', auth, recetaController.actualizarReceta);
    app.delete('/recetas/delete/:id', auth, recetaController.deleteRecipeById);
    app.get('/recetas/favoritos/:id', auth, recetaController.getFavoritos);
    app.post('/recetas/favoritos', auth, recetaController.addToFavorites);
    app.delete('/recetas/favoritos/:id', auth, recetaController.removeFromFavorites);
    app.get('/recetas/usuario-receta/:id', auth, recetaController.buscarUsuarioPorReceta);
}







