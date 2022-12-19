import { AppRoutes } from './Routes';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}

export default App
