import { Header } from '../components/header/Header';
import { Main } from '../components/main/Main';
import { Footer } from '../components/footer/Footer';
import { Box, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useAuth } from '../hooks/UseAuth';
import { useEffect, useState } from 'react';


const autocompleteStyle = {
    width: 300,

    '& .MuiInputBase-root': {
        color: '#885FFF',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
    },

    '& .MuiInputLabel-root': {
        color: '#885FFF',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
    },

    '& .MuiSelect-icon': {
        color: '#885FFF',
    },

    '& .MuiSelect-select': {
        '&:focus': {
            backgroundColor: 'transparent',
        }
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

export function Index() {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [games, setGames] = useState<any>(null);
    const [selectedConsole, setSelectedConsole] = useState<any>('xbox');
    const [filteredList, setFilteredList] = useState<any>(null);
    const consoles = {
        xbox: 'Xbox',
        playstation: 'Playstation',
        switch: 'Switch',
        pc: 'PC',
    };

    const genres = {
        acao: 'Ação',
        aventura: 'Aventura',
        estrategia: 'Estratégia',
        RPG: 'RPG',
        esporte: 'Esporte',
        simulacao: 'Simulação',
    };

    const [gamesSearch, setGamesSearch] = useState<any>([]);

    useEffect(() => {
        if (user) {
            const response = fetch('https://web-back-end-five.vercel.app/me', {
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
            });
        }
    }, [user]);

    useEffect(() => {
        fetch('https://web-back-end-five.vercel.app/games', {
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
            let searchGames: any[] = [];

            Object.keys(genres).map((key: any) => {
                searchGames.push({
                    label: genres[key as keyof typeof genres],
                    value: key,
                });
            });

            searchGames = [
                ...searchGames,
                ...data.map((game: any) => {
                    return {
                        label: game.title,
                        value: game.title,
                        id: game.id,
                    };
                }),
                ...data.map((game: any) => {
                    if (game.developer && searchGames.findIndex((searchGame: any) => searchGame.value === game.developer) === -1) {
                        return {
                            label: game.developer,
                            value: game.developer,
                        };
                    }
                }),
            ];

            setGamesSearch([...gamesSearch, ...searchGames]);
            setFilteredList(data);
            setGames(data);

            handleConsoleChange('xbox');
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleConsoleChange = (event: any) => {
        setSelectedConsole(event.target.value);
        setFilteredList([])

        fetch(`https://web-back-end-five.vercel.app/games/top/${event.target.value}`, {
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
            setFilteredList(data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleSearch = (event: any, value: any) => {
        let route = 'https://web-back-end-five.vercel.app/games/';

        setFilteredList([]);

        if (value) {
            if (value.id) {
                route += `title/${value.value}`;
            } else if (Object.keys(genres).includes(value.value)) {
                route += `genre/${value.value}`;
            } else {
                route += `developer/${value.value}`;
            }
        }

        fetch(route, {
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
            setFilteredList(data);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <Header />
            <Main>
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
                    }}>Jogos</h1>

                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: 'rgb(101, 116, 139)',
                        fontFamily: 'Montserrat, sans-serif',
                        textAlign: 'center'
                    }}>Aqui você encontra os melhores jogos</p>
                </Box>

                <Box sx={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FormControl sx={{
                        m: 1,
                        minWidth: 150,

                        '& .MuiInputBase-root': {
                            color: '#885FFF',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 400,
                        },

                        '& .MuiInputLabel-root': {
                            color: '#885FFF',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 400,
                        },

                        '& .MuiSelect-icon': {
                            color: '#885FFF',
                        },

                        '& .MuiSelect-select': {
                            '&:focus': {
                                backgroundColor: 'transparent',
                            }
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
                    }}>
                        <InputLabel id="demo-simple-select-label">Console</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedConsole}
                            label="Console"
                            onChange={handleConsoleChange}
                        >
                            {
                                Object.keys(consoles).map((console: string, index: number) => {
                                    return (
                                        <MenuItem value={console} key={index}>{consoles[console as keyof typeof consoles]}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    {
                        gamesSearch && (

                            // search by value
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={gamesSearch}
                                getOptionLabel={(option: any) => option.label}
                                sx={autocompleteStyle}
                                renderInput={(params) => <TextField {...params} label="Pesquisar" />}
                                onChange={handleSearch}
                            />
                        )
                    }

                </Box>

                <Grid container spacing={2} sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {
                        filteredList && filteredList.map((game: any, index: number) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '24px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => {
                                            window.location.href = `/review/${game.id}`;
                                        }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={game.image}
                                            alt={game.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <CardContent sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '8px',
                                        }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {game.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Descrição: {game.summary}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Desenvolvedor: {game.developer}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Gênero: {
                                                    genres[game.genre as keyof typeof genres] ||
                                                    game.genre
                                                }
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Console: {
                                                    consoles[game.console as keyof typeof consoles] ||
                                                    game.console
                                                }
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Preço: {game.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Avaliação: {game.rating}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Main>
            <Footer />
        </>
    );
}
