import { Box } from '@mui/material';


export const Main = ({ children, styleProp }: { children: any, styleProp?: any }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 64px - 50px)',
                width: '100%',
                maxWidth: '1300px',
                margin: '0 auto',
                padding: '20px 24px 0px',
                ...styleProp,
            }}
        >
            {children}
        </Box>
    );
}
