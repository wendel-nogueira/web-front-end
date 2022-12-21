import { Header } from '../components/header/Header';
import { Main } from '../components/main/Main';
import { Footer } from '../components/footer/Footer';
import { Box, Button, TextField, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/UseAuth';
import { Cookies } from 'react-cookie';


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
    const [userProfile, setUserProfile] = useState({
        email: '',
        name: '',
        sub: '',
        username: '',
    });
    const [game, setGame] = useState({
        title: '',
        summary: '',
        developer: '',
        genre: '',
        console: '',
        price: '',
        rating: '',
    });

    const { user, signOut } = useAuth();
    const cookies = new Cookies();


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
        const userInfo = cookies.get('user');

        if (userInfo) {
            fetch('https://web-back-end-five.vercel.app/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo}`,
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
                signOut();
                console.log(error);
            });
        } else {
            window.location.href = '/login';
        }
    }, []);

    const [review, setReview] = useState({
        title: '',
        description: '',
        rating: 0,
    });

    function handleReview() {
        const id = window.location.pathname.replace('/review/', '');

        if (review.title === '' || review.description === '' || review.rating === 0) {
            alert('Preencha todos os campos');
            return;
        }

        if (typeof review.rating !== 'number') {
            alert('A nota deve ser um número');
            return;
        }

        if (review.rating < 1 || review.rating > 5) {
            alert('A nota deve ser entre 1 e 5');
            return;
        }

        const reviewData = {
            title: review.title,
            review: review.description,
            rating: review.rating,
            userId: userProfile.sub,
        }

        //fetch(`https://web-back-end-five.vercel.app/games/${id}/reviews`, {
        fetch(`http://localhost:3000/games/${id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`,
            },
            body: JSON.stringify(reviewData),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then((data) => {
            console.log(data);
            alert('Avaliação enviada com sucesso');
            window.location.href = '/';
        }).catch((error) => {
            alert('Ocorreu um erro ao enviar a avaliação');
            console.log(error);
        });
    }


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
                        <TextField id="outlined-multiline-static-1" label="Título" multiline variant="outlined" type="text" size='small' sx={styleInput} value={review.title} onChange={(e) => setReview({ ...review, title: e.target.value })} />

                        <TextField id="outlined-multiline-static-2" label="Avaliação" multiline variant="outlined" type="text" size='small' sx={styleInput} value={review.description} onChange={(e) => setReview({ ...review, description: e.target.value })} />

                        <TextField
                            id="standard-number"
                            label="Nota"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            sx={styleInput}
                            value={review.rating}
                            onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                        />

                        <Button variant="contained" sx={{
                            width: '100%',
                            marginTop: '8px',
                            backgroundColor: '#885FFF',

                            '&:hover': {
                                backgroundColor: '#885FFF',
                            },
                        }} onClick={handleReview}>Enviar</Button>
                    </Box>
                </Box>
            </Main>
            <Footer />
        </>
    )
}
