import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import './movie-info.css';

function Movie(){

    const resource = '/movie/';
    const {id} = useParams();
    const api_key = '9e410252d84569eef779475a902d9330';
    const languagePortuges = 'pt-BR';
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadMovie(){
            /**
             * api.get : é uma promiss
             * .then caso sucesso faça isso
             * .catch caso fail faça isso
             */
            const response = await api.get(resource + id, {
                params:{
                    api_key: api_key,
                    language: languagePortuges
                }
            })
            .then((response)=>{
                setMovie(response.data);
                setLoading(false);
                console.log(response)
            })
            .catch(()=>{
                console.log('Movie not found.')
            })
        }

        loadMovie();

        return ()=>{
            console.log('Component desmontado')
        }
    }, []);

    if(loading){
        return(
            <div className="movie-details">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="movie-details">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {parseFloat(movie.vote_average).toFixed(1)} / 10</strong>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href="#">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Movie;