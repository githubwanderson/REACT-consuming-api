import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './movie-info.css';
import { toast } from "react-toastify";

function Movie(){

    const resource = '/movie/';
    const {id} = useParams();
    const api_key = '9e410252d84569eef779475a902d9330';
    const languagePortuges = 'pt-BR';
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    /**
     * navigate - Para lançar um redirect 
     */
    const navigate = useNavigate();

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
                // console.log(response);
            })
            .catch(()=>{
                console.log('Movie not found.')
                /**
                 * ir para "/" home
                 * replace: true - reload
                 */
                navigate("/",{ replace: true });
                return;
            })
        }

        loadMovie();

        return ()=>{
            console.log('Component desmontado')
        }
    }, [resource,api_key,languagePortuges,navigate]);

    /**
     * Vamos salvar um filme no LocalStorage
     * 
     */
    function saveMovie(){
        /**
         * Pegamos no localStorage o item '@primeflix'
         * savedMovie - Se ele existir passo para JSON se nao passo um array vazio
         */
        const myList = localStorage.getItem('@primeflix');
        let savedMovie = JSON.parse(myList) || [];
        /**
         * some() - verifica no array se ha um indice com o mesmo valor
         * if sim alert e return
         */
        const hasMovie = savedMovie.some( (savedMovie)=> savedMovie.id === movie.id  );
        if(hasMovie){
            toast.warning('Este filme já esta na lista')
            return;
        }         
        /**
         * ARRAY.push(VALOR) - add valor no final do array 
         */
        savedMovie.push(movie);
        /**
         * Add item no localStorage mas antes altero para string
         */
        localStorage.setItem('@primeflix',JSON.stringify(savedMovie));
        toast.success("Filme salvo com sucesso!");
    }

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
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${movie.title} Trailer`} target='blank' rel='external'>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Movie;