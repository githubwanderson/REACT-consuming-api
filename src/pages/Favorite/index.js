import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './favorite.css';

function Favorite(){

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const myList = localStorage.getItem('@primeflix');
        /**
         * Se myList true entao salva ela no setMovies se nao salva [] 
         */
        setMovies(JSON.parse(myList) || []);
      
    },[]);    

    return(
        <div className="my-favorites">
            <h1>Meus favoritos</h1>
            <ul>
                {movies.map((movie)=>{
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movies/${movie.id}`}>Ver detalhes</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                    )
                })}     
            </ul>       
        </div>
    )
}

export default Favorite;