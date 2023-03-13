const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
// const image = require("./routes/image");


app.use(express.static(__dirname + 'public'));
app.use(fileUpload());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
  
}));

require("./config/mongoose.config");

app.use('/images', express.static(__dirname + '/public/uploads'));

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const recetaRoute = require("./routes/receta.route");
userRoute(app);
authRoute(app);
recetaRoute(app);



const port = 8000;
http.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});
