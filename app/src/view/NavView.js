import { Link } from 'react-router-dom'
// Material-UI Component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// FontAwesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
// import Styled Components
import styled from 'styled-components'


// Styling
const Typo = styled(Typography)`
    flexGrow: 1;
`


export default function Nav() {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typo variant="h6">
                    <Link to='/' className="nav-link">
                        <FontAwesomeIcon icon={faBook} transform="left-7"/>Bookipedia
                    </Link>
                </Typo>
            </Toolbar>
        </AppBar>
    )

}