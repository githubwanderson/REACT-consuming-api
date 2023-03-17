/**
 * useEffect: when user in application, it loading the api
 * useState: for saving date to api
 */
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../../services/api";
import "./home.css";

function Home(){

    const resource = 'movie/now_playing';
    const api_key = '9e410252d84569eef779475a902d9330';
    const languagePortuges = 'pt-BR';

    /**
     * state que armazena os films
     */
    const[movies, setMovies] = useState([]);

    useEffect(()=>{

        /**
         * Function que busca os dados da API
         */
        async function loadMovies(){
            /**
             * await - para esperar a requisição
             */
            const response = await api.get(resource, {
                params:{
                    api_key: api_key,
                    language: languagePortuges,
                    page: 1
                }
            });

            /**
             * response.data.results - api data I want to work
             * slice() - method to show quantity desired. This exemplo I want zero to ten
             */
            console.log(response.data.results.slice(0,10))
            setMovies(response.data.results.slice(0,10))
        }

        loadMovies();

    }, []);

    return(
        <div className="container">
            <div className="list-movie">
                {movies.map((movie)=>
                    <article key={movie.id}>
                        <strong>{movie.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                        <Link to={`/filme/${movie.id}`}>Acessar</Link>
                    </article>
                )}
            </div>
        </div>
    )
}

export default Home;