import { 
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { Games } from './pages/Games';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Reviews } from './pages/Reviews';


export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<Games />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}
