import styled from "styled-components"
import {GetOneMovie} from './../../requests.js'
import loadingGif from '../../loading.gif'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SessionsPage() {

    const [movie,setCurrentLookingMovie] = useState(undefined);
    const {movieId} = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        GetOneMovie(Number(movieId),setCurrentLookingMovie);

    },[]);

    if(movie != undefined && movie.code == "ERR_BAD_REQUEST")
    {
        navigate('/error',{state:`${movie.response.status},${movie.response.statusText}`});
    }

    return (
        <PageContainer>
            {movie ? <p>Selecione o horário</p> : <img className="loading-gif" src={loadingGif}/>}
            <div>
                {movie && movie.days.map((day) => (<SessionContainer data-test="movie-day" key={day.id}>
                    {day.weekday + ' - ' + day.date}
                    <ButtonsContainer>
                        {day.showtimes.map( (showtime) => 
                    
                            <button data-test="showtime" key={showtime.id} onClick={() => navigate(`/assentos/${showtime.id}`)}>{showtime.name}</button>
                        
                        )}
                    </ButtonsContainer>
                </SessionContainer>))}
            </div>

            <FooterContainer data-test="footer">
                <div >
                    { movie ? <img src={movie.posterURL} alt="poster" /> : <img className="loading-gif-mini" src={loadingGif}/>}
                </div>
                <div>
                    <p>{movie ? movie.title : 'Carregando..'}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    box-sizing: border-box;
    padding-top: 70px;
    div {
        margin-top: 20px;
        box-sizing: border-box;
    }

    .loading-gif{
        width: 300px;
        height: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    box-sizing: border-box;
    button {
        margin-right: 20px;
        cursor: pointer;
        transition: all 200ms;
        box-sizing: border-box;
        &:hover{
            color: #E8833A;
            border: 1px solid #E8833A;
            background-color: white;
        }
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;

        .loading-gif-mini{
            width: 30px;
            object-fit: contain;
        }

        img {
            width: 50px;
            height: 70px;
            padding: 8px;
            object-fit: cover;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`