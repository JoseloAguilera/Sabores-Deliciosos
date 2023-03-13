import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import RecipesList from "./components/recipes";
import Signin from "./components/signin";
import RecipePage from "./components/recipePage";
import SignUp from "./components/signup";
import Logout from "./components/logout";
import RecipeCreate from "./components/recipeCreate";
import RecipeEdit from "./components/recipeEdit";
import RecipeDelete from "./components/recipeDelete";
import userService from "./services/userService";
import Favorites from "./components/favorites";
import ProtectedRoute from "./components/common/protectedRuta";

//use the createContext hook to pass the user all over the components
export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      const currentUser = userService.getCurrentUser();
      if (currentUser) {
        const user = await userService.getUser();
        setUser(user)
      }
      return true;
    })();
  }, []);

  return (
    <div className="App d-flex flex-column min-vh-100">
      <UserContext.Provider value={user}>
        <Header />
        <ToastContainer />
        <main className="fill">
          <Routes>
            <Route path='/recetas/:id 'element={<ProtectedRoute path='/recetas/:id' component={RecipeEdit} />} />
            <Route element={<ProtectedRoute path='/recetas/delete/:id' component={RecipeDelete} />} />
            {/* <Route element={<ProtectedRoute path="/favoritos" component={Favorites} />} /> */}
           {/*  <Route element={<ProtectedRoute path="/crear-receta/:location" element={<RecipeCreate/>} />} /> */}
            {/* <Route element={<ProtectedRoute path="/logout" component={Logout} />} /> */}
            <Route path="/crear-receta" element={<RecipeCreate/>} />
            <Route path="/favoritos" element={<Favorites/>} />
            <Route path="/recetas" element={<RecipesList/>} />
            <Route path="/receta/:id" element={<RecipePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default App;
