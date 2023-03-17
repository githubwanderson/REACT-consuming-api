/**
 * useEffect: when user in application, it loading the api
 * useState: for saving date to api
 */

import { useEffect, useState } from "react";
// Resources: movie/now_playing
// Param API key: ?api_key=9e410252d84569eef779475a902d9330

import api from "../../services/api";

function Home(){

    const[films, setFilms] = useState([]);

    useEffect(()=>{

        /**
         * Function que busca os dados da API
         */
        async function loadMovies(){
            /**
             * await - para esperar a requisição
             */
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: '9e410252d84569eef779475a902d9330',
                    language: 'pt-BR',
                    page: 1
                }
            });

            console.log(response.data.results)


        }

        loadMovies();

    }, []);

    return(
        <div>
            <h1>Welcome at Home</h1>
        </div>
    )
}

export default Home;