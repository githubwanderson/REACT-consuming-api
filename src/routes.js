/**
 * IMPORTANT For use routes is necessary install "npm install react-router-dom"
 */
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import Movie from "./pages/Movie";

// import components
import Header from "./components/Header";


function RoutesApp(){
    return(
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;