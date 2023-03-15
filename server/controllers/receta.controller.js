const { Receta, validateReceta } = require("../models/receta.model");
const { User } = require("../models/user.model");
const fs = require("fs");
const path = require("path");


module.exports.getFavoritos = async (req, res) => {
    try {
        let receta = await Receta.find({ user_id: req.user._id });
        const user = await User.findById({ _id: req.user._id, favoritos: receta });
        if (!user) {
            return res.status(401).send("No se encuentra usuario");
        }
        receta = await Receta.find({ _id: user.favoritos });
        res.json(receta);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports.removeFromFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const receta = await Receta.findById(req.params.id);
        if (!user) {
            return res.status(401).send("Usuario no encontrado");
        }
        if (!receta) {
            return res.status(401).send("Receta no encontrada");
        }
        user.favoritos.pull(receta._id);
        user.save();
        res.send(receta);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports.addToFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const receta = await Receta.findById(req.body._id);
       
        if (!receta) {
            return res.status(401).send("Algo salió mal");
        }
        const inF = await User.findOne({
            _id: req.user._id,
            favoritos: receta._id,
        });
        if (inF) return res.status(401).send("La receta ya esta en favoritos");
        user.favoritos.push(receta._id);
        user.save();
        res.send("Añadido a favoritos");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports.getAllRecipes = async (req, res) => {
    try {
        const recetas = await Receta.find({});
        res.json(recetas);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports.searchRecipes = async (req, res) => {
    try {
        const search = req.params.search;
        const data = await Receta.find({
        $or: [
            { titulo: { $regex: search, $options: "i" } },
            { ingredientes: { $regex: search, $options: "i" } },
            { instrucciones: { $regex: search, $options: "i" } },
        ],
        },
        (err, doc) => {}
        );
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//get recipe by id 
module.exports.getRecipeById = async (req, res) => {
    const receta = await Receta.findById(req.params.id);
    if (!receta) return res.status(401).send('Receta no encontrada');
    res.json(receta);
};

  //delete the recipe ans the image
module.exports.deleteRecipeById = async (req, res) => {
    const receta = await Receta.findOneAndRemove({
        _id: req.params.id,
        user_id: req.user._id,
    });
    if (!receta) return res.status(400).send("No existe la receta");
    const filePath = path.join(__dirname, '../public/uploads', receta.foto);
    if (!filePath) return res.status(401).send('Did not found an recipe image');
    fs.unlinkSync(filePath);
    res.send(receta);
};

  //get recipe by id
module.exports.getMyRecipes = async (req, res) => {
    const recetas = await Receta.find({ user_id: req.user._id });
    res.json(recetas);
};

  //post a new recipe
module.exports.createRecipe = async (req, res) => {
    if (req.files === null) return res.status(400).send('No se cargo la foto');
    const file = req.files.foto;
    file.name = Math.floor(Math.random() * 99999) + '_' + file.name;
    const filePath = path.join(__dirname, '../public/uploads', file.name);
    file.mv(filePath, err => {
        if (err) {
            return res.status(400).send(err);
        }
    });

    const { error } = validateReceta(req.body);
    if (error) return res.status(405).send(error.details[0].message);
    let receta = new Receta({
        ...req.body,
        user_id: req.user._id,
        foto: file.name
    });
    await receta.save();
    res.send(receta);
};

module.exports.actualizarReceta = async (req, res) => {
    if (req.files !== null) {
        const file = req.files.foto;
        if (!file) return res.status(401).send('No se encuentra archivo.');
        file.name = Math.floor(Math.random() * 99999) + '_' + file.name;
        const newBody = { ...req.body };
        delete newBody._id;
        const { error } = validateReceta(newBody);
        if (error) return res.status(406).send(error.details[0].message);

        let receta = await Receta.findOne({ _id: req.params.id, user_id: req.user._id });
        if (!receta) return res.status(401).send('No se encuentra el id de la receta');
        
        let filePath = path.join(__dirname, '../', 'public/uploads', receta.foto);
        if (!filePath) return res.status(401).send('No se encontre la imagen');
        await fs.unlinkSync(filePath);

        filePath = path.join(__dirname, '../', 'public/uploads', file.name)
        file.mv(filePath, err => {
        if (err) {
            return res.status(400).send(err);
        }
        });
    
        const nuevaReceta = new Receta({
            _id: req.params.id,
            titulo: req.body.titulo,
            foto: req.files.foto.name,
            ingredientes: req.body.ingredientes,
            instrucciones: req.body.instrucciones,
            user_id: req.user._id,
        });
        receta = await Receta.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, nuevaReceta);
        res.json(receta);
    } else if (req.files === null) {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(401).send('Usuario no encontrado');
        let receta = await Receta.findOne({ _id: req.params.id, user_id: user._id });
        if (!receta) return res.status(401).send('Receta no encontrada.');  
        const newBody = req.body;
        delete newBody._id;
        delete newBody.foto;

        const { error } = validateReceta(newBody);
        if (error) return res.status(400).send(error.details[0].message);

        receta = await Receta.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, newBody);
        res.json(receta);
    
    }
    };

module.exports.buscarUsuarioPorReceta = async (req, res) => {
    let receta = await Receta.findById(req.params.id);
    if (!receta) return res.status(401).send('Receta no encontrada');
    let user = await User.findById(receta.user_id);
    if (!user) return res.status(401).send('Usuario no encontrado.');
    res.json(user);
};