import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './favorite.css';
import { toast } from "react-toastify";

function Favorite(){

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const myList = localStorage.getItem('@primeflix');
        /**
         * Se myList true entao salva ela no setMovies se nao salva [] 
         */
        setMovies(JSON.parse(myList) || []);
      
    },[]);    

    function deleteMovie(id){    
        /**
         * Metodo antigo
         * ARRAY.indexof() - localizo um index de um elemento passado o valor dele
         * ARRAY.splice() - excluir um index dentro do array()
         */    
        // let index = movies.indexOf(id);
        // setMovies(movies.splice(index));

        /**
         * Metodo new
         * ARRAY.filter - recebe uma aerow function
         * logica - retorna todos os elementos que são !== id 
         */
        let filterMovies = movies.filter((item)=>{
            return (item.id !== id)
        })
        // let filterMovies = movies.filter((item)=> item.id !== id)

        setMovies(filterMovies);
        localStorage.setItem('@primeflix',JSON.stringify(filterMovies));
        toast.success('Filme removido com sucesso!')
    }

    return(
        <div className="my-favorites">
            <h1>Meus favoritos</h1>

            {movies.length === 0 && <span>Você não tem nenhum filme salvo!</span>}

            <ul>
                {movies.map((movie)=>{
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movies/${movie.id}`}>Ver detalhes</Link>
                                <button onClick={()=> deleteMovie(movie.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}     
            </ul>       
        </div>
    )
}

export default Favorite;