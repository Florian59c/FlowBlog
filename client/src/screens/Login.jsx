import { Link } from 'react-router-dom';
import './css/Login.css';

function Login() {
    return (
        <div>
            <p>Login page</p>

            <Link to="/register" >
                <button>se se créer un comte</button>
            </Link>
        </div>
    );
}

export default Login;