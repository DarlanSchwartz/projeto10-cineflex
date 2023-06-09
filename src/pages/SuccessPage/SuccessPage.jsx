import { useNavigate } from "react-router-dom";
import styled from "styled-components"


export default function SuccessPage(props) {

    const navigate = useNavigate();

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{props.sucess_info.title}</p>
                <p>{props.sucess_info.date +" - "+ props.sucess_info.time}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {props.sucess_info.seats.map((i) => {return <p key={i.id} >Assento {i.name}</p>})}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {props.sucess_info.username}</p>
                <p>CPF: {props.sucess_info.cpf}</p>
            </TextContainer>

            <button data-test="go-home-btn" onClick={() => navigate('/')}>Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        &:hover{
            color: #E8833A;
            border: 1px solid #E8833A;
            background-color: white;
        }

        cursor: pointer;
        transition: all 200ms;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`