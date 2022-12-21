import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip, Link, Button } from '@mui/material';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import { useAuth } from '../../hooks/UseAuth';
import { useEffect, useState } from 'react';


const linkStyle = {
    fontSize: '1rem',
    fontWeight: 400,
    color: '#885FFF',
    fontFamily: 'Montserrat, sans-serif',

    '&:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '2px',
        backgroundColor: '#885FFF',
        transform: 'scaleX(0)',
        transition: 'transform 250ms ease-in-out',
    },
    '&:hover:after': {
        transform: 'scaleX(1)',
    },
};

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { user, signOut } = useAuth();
    const [userProfile, setUserProfile] = useState<any>(null);

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

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            height: '64px',
            background: '#FFF',
            width: '100%',
            boxShadow: 'rgb(100 116 139 / 12%) 0px 1px 4px',
            padding: '0 24px',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: '1300px',
                margin: '0 auto',
            }}>
                <nav style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '64px',
                    padding: '0 16px',
                    marginLeft: 'auto',
                }}>
                    <ul style={{
                        display: 'flex',
                        columnGap: '16px',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                    }}>
                        <li>
                            <Link href="/" underline="none" sx={linkStyle} >
                                {'home'}
                            </Link>
                        </li>
                        <li>
                            <Link href="/games" underline="none" sx={linkStyle} >
                                {'jogos'}
                            </Link>
                        </li>
                    </ul>
                </nav>
                {
                    user ? (
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{
                                    width: 32,
                                    height: 32,
                                    backgroundColor: '#885FFF',
                                }}>
                                    {userProfile?.username[0]}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Button variant="contained" sx={{
                            backgroundColor: '#885FFF',
                            color: '#FFF',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#5215FC',
                            },
                        }} size="small" onClick={() => {
                            window.location.href = '/login';
                        }}>
                            entrar
                        </Button>
                    )
                }
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/*<MenuItem>
                    <Avatar /> Profile
                </MenuItem>*/}
                {/*<MenuItem>
                    <Avatar /> My account
                </MenuItem>*/}
                {/*<Divider />*/}
                {/*<MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>*/}
                {/*<MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>*/}
                <MenuItem onClick={() => {
                    signOut();
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography variant="inherit">Sair</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};
