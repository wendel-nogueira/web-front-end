import { Box, Grid, TextField, Button, Link, Modal, Divider } from '@mui/material';
import { useState } from 'react';
import {
    useNavigate as Router,
} from 'react-router-dom';
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

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: '#F9FAFC',
    boxShadow: 24,
    p: 4,
    borderRadius: '0.2rem',
};

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = Router();
    const { signIn } = useAuth();

    const handleLogin = (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Preencha todos os campos!');
            return false;
        }

        if (email.indexOf('@') === -1) {
            alert('E-mail inválido!');
            return false;
        }

        signIn(email, password).then((response: any) => {
            if (response.access_token) {
                router('/');
                return true;
            }

            alert('Usuário ou senha inválidos!');
            return response;
        }).catch((error) => {
            alert('Erro ao fazer login');
            return false;
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });

    const handleRegister = (e: any) => {
        e.preventDefault();
        handleOpen();
    };

    const handleRegisterUser = (e: any) => {
        e.preventDefault();

        if (!registerInfo.name || !registerInfo.email || !registerInfo.username || !registerInfo.password) {
            alert('Preencha todos os campos!');
            return false;
        }

        if (registerInfo.email.indexOf('@') === -1) {
            alert('E-mail inválido!');
            return false;
        }

        if (registerInfo.password.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres!');
            return false;
        }

        const data = {
            name: registerInfo.name,
            email: registerInfo.email,
            username: registerInfo.username,
            password: registerInfo.password,
        }

        fetch('https://web-back-end-five.vercel.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 201) {
                alert('Usuário cadastrado com sucesso!');
                handleClose();
                signIn(registerInfo.email, registerInfo.password).then((response: any) => {
                    if (response.access_token) {
                        router('/');
                        return true;
                    }
                    return response;
                }).catch((error) => {
                    alert('Erro ao fazer login, faça login manualmente!');
                    return false;
                });
                return response.json();
            } else {
                response.json().then((data) => {
                    console.log(data);
                    alert(data.error);
                });

                return response;
            }
        }).then((data) => {
            console.log(data);
            console.log('Success:', data);
            return data;
        }).catch((error) => {
            alert('Erro ao cadastrar usuário!');
            console.error('Error:', error);
            return error;
        }).finally(() => {
            /*setRegisterInfo({
                name: '',
                email: '',
                username: '',
                password: '',
            });*/
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                background: '#410ED3',
            }}
        >
            <Grid container>
                <Grid item xs={23} sm={9} md={5} style={{
                    background: '#F9FAFC',
                    height: '100vh',
                    marginRight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '0 2rem'
                }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}>

                    </Box>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem'
                    }}>
                        <h1 style={{
                            color: '#410ED3',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}>Bem-vindo de volta!</h1>
                        <p style={{
                            color: '#6B6E70',
                            fontSize: '1rem',
                            marginBottom: '1rem',
                            fontWeight: '300'
                        }}>Faça login com sua conta para começar</p>
                    </Box>

                    <Box sx={{
                        maxWidth: '400px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem'
                    }}>
                        <form>
                            <TextField label="Email" name='email' variant="outlined" sx={styleInput} size="small" type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete={'email'} />
                            <TextField label="Senha" name='password' variant="outlined" sx={styleInput} size="small" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={'current-password'} />

                            <Button variant="contained" sx={{
                                width: '100%',
                                marginBottom: '2rem',
                                background: '#410ED3',

                                '&:hover': {
                                    background: '#280886',
                                }
                            }} type={'submit'} onClick={handleLogin}>Entrar</Button>
                        </form>

                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            columnGap: '0.2rem'
                        }}>
                            <p style={{
                                color: '#6B6E70',
                                fontSize: '1rem',
                            }}>Não tem uma conta?</p>

                            <Link href="#" underline="none" sx={{
                                color: '#410ED3',
                                fontSize: '1rem',
                            }} onClick={(e) => handleRegister(e)}>
                                {'Cadastre-se'}
                            </Link>
                        </Box>

                        <Link href="/" underline="none" sx={{
                            color: '#410ED3',
                            fontSize: '1rem',
                        }}>
                            {'Voltar para a página inicial'}
                        </Link>
                    </Box>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <h1 style={{
                        color: '#410ED3',
                        fontSize: '1.6rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}>Crie sua conta</h1>
                    <p style={{
                        color: '#6B6E70',
                        fontSize: '1rem',
                        marginBottom: '1rem',
                        fontWeight: '300'
                    }}>Preencha os campos abaixo para criar sua conta</p>

                    <Divider component={'hr'} sx={{
                        width: '100%',
                        marginBottom: '2rem'
                    }} />

                    <form style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem'
                    }}>
                        <TextField label="Nome" name='name' variant="outlined" sx={styleInput} size="small" type={'text'} autoComplete={'name'} value={registerInfo.name} onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })} />
                        <TextField label="Email" name='email' variant="outlined" sx={styleInput} size="small" type={'email'} autoComplete={'email'} value={registerInfo.email} onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })} />
                        <TextField label="Usuário" name='username' variant="outlined" sx={styleInput} size="small" type={'text'} autoComplete={'username'} value={registerInfo.username} onChange={(e) => setRegisterInfo({ ...registerInfo, username: e.target.value })} />
                        <TextField label="Senha" name='password' variant="outlined" sx={styleInput} size="small" type={'password'} autoComplete={'current-password'} value={registerInfo.password} onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })} />

                        <Button variant="contained" sx={{
                            width: '100%',
                            marginBottom: '2rem',
                            background: '#410ED3',
                            
                            '&:hover': {
                                background: '#280886',
                            }
                        }} type={'submit'} onClick={handleRegisterUser}>Cadastrar</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}
