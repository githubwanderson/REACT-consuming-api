import { Link } from "react-router-dom";
import './notfound.css';

function Notfound(){

    return(
        <div className="not-found">
            <h1>404:</h1>
            <h2>Not found - This page not exist</h2>
            <Link to="/">Veja todos os filmes!</Link>
        </div>
    )
}

export default Notfound;