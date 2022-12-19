import { Header } from '../components/header/Header';
import { Main } from '../components/main/Main';
import { Footer } from '../components/footer/Footer';
import { Box, Button, TextField, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/UseAuth';


const styleInput = {
    width: '100%',
    marginBottom: '1rem',
    background: '#F9FAFC',

    '&:hover': {
        background: '#F9FAFC',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#410ED3',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#410ED3',
        },
    },
    '& .MuiFormLabel-root': {
        '&.Mui-focused': {
            color: '#410ED3',
        },
    },
};

export function Reviews() {
    const [userProfile, setUserProfile] = useState({});
    const [game, setGame] = useState({
        title: '',
        summary: '',
        developer: '',
        genre: '',
        console: '',
        price: '',
        rating: '',
    });
    const { user } = useAuth();

    useEffect(() => {
        const id = window.location.pathname.replace('/review/', '');

        if (id === '') {
            window.location.href = '/';
        }

        fetch(`https://web-back-end-five.vercel.app/games/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then((data) => {
            setGame(data);
        }).catch((error) => {
            console.log(error);

            window.location.href = '/';
        });
    }, []);

    useEffect(() => {
        if (user) {
            fetch('https://web-back-end-five.vercel.app/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}`,
                },
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            }).then((data) => {
                setUserProfile(data);
            }).catch((error) => {
                console.log(error);

                window.location.href = '/login';
            });
        }
    }, [user]);

    return (
        <>
            <Header />
            <Main >
                <Box sx={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: '#885FFF',
                        fontFamily: 'Montserrat, sans-serif',
                        textAlign: 'center'
                    }}>Reviews</h1>

                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: 'rgb(101, 116, 139)',
                        fontFamily: 'Montserrat, sans-serif',
                        textAlign: 'center'
                    }}>Faça uma avaliação sobre o jogo que você jogou</p>
                </Box>

                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '24px',
                        rowGap: '8px',
                    }}>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#885FFF',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: '8px',
                        }}>{game?.title}</h1>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                        }}>Descrição: {game?.summary}</p>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                        }}>Desenvolvedor: {game?.developer}</p>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                        }}>Gênero: {game?.genre}</p>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                        }}>Console: {game?.console}</p>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                        }}>Preço: {game?.price}</p>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                        }}>Avaliação: {game?.rating}</p>
                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    <Box sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '24px',
                        rowGap: '8px',
                        margin: 'auto',
                    }}>
                        <TextField id="outlined-multiline-static" label="Título" multiline variant="outlined" type="text" size='small' sx={styleInput} />

                        <TextField id="outlined-multiline-static" label="Avaliação" multiline variant="outlined" type="text" size='small' sx={styleInput} />

                        <TextField id="outlined-multiline-static" label="Nota" multiline variant="outlined" type="number" size='small' sx={styleInput} />

                        <Button variant="contained" sx={{
                            width: '100%',
                            marginTop: '8px',
                            backgroundColor: '#885FFF',

                            '&:hover': {
                                backgroundColor: '#885FFF',
                            },
                        }}>Enviar</Button>
                    </Box>
                </Box>
            </Main>
            <Footer />
        </>
    )
}
