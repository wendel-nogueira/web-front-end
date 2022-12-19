export const Footer = () => {
    return (
        <footer style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            marginTop: 'auto',
        }}>
            <p style={{
                fontSize: '0.8rem',
                color: '#999',
                fontWeight: 400,
            }}>
                Desenvolvido com ❤️ por <a href="https://github.com/wendel-nogueira" target={ "_blank" } style={{
                    color: '#885FFF',
                    textDecoration: 'none',
                }}>@wendel-nogueira</a>
            </p>
        </footer>
    )
}
