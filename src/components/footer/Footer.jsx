import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import './styles.css';

function Footer() {
    return (
        <footer class="footer">
            <article class="footer__media">
                <a href="https://github.com/ttnguyen115" target="_blank" rel="noopener noreferrer" ><GitHubIcon className="icon" fontSize="inherit"/></a>
                <a href="https://www.facebook.com/thanh.trung.101" target="_blank" rel="noopener noreferrer" ><FacebookIcon className="icon" fontSize="inherit" /></a>
                <a href="https://www.instagram.com/_nttrungg_/" target="_blank" rel="noopener noreferrer" ><InstagramIcon className="icon" fontSize="inherit" /></a>
            </article>
        </footer>
    )
}

export default Footer
