import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Logout() {
    const navigate = useNavigate();
    const { setUsuario } = useContext(AuthContext); // extraer setUsuario en lugar de setAuth

    setUsuario(null); // usar setUsuario para actualizar el estado de autenticación
    navigate('/login');

    return null;
};

export default Logout;