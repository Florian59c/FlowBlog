import { Link } from 'react-router-dom';
import './css/Footer.css';
import React from 'react';

function Footer(props) {
    return (
        <div className='footer'>
            <div className='cv'>
                <a href="https://drive.google.com/file/d/1uFrpe1KJcNwMXhy2cCbl47yefGmuT5h6/view?usp=sharing" target="_blank" rel="noreferrer noopener"><p>CV</p></a>
            </div>
            <div>
                {props.currentUserRole === "ADMIN" &&
                    <div>
                        <Link to="/admin-page">
                            <p>Gestion Administrateur</p>
                        </Link>
                    </div>
                }
            </div>
            <div className='link'>
                <a href="https://www.linkedin.com/in/florian-cagnon-dev-web-fullstack/" target="_blank" rel="noreferrer noopener"><p>LinkedIn</p></a>
                <a href="https://github.com/Florian59c?tab=repositories" target="_blank" rel="noreferrer noopener"><p>GitHub</p></a>
            </div>
        </div>
    )
}

export default Footer;