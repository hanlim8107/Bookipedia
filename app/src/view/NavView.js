import StyledNoneLink from './reusable/Link'
// import Styled Components
import styled from 'styled-components'
// Material-UI Component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// FontAwesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";


// Styling
const StyledAppBar = styled(AppBar)`
    box-shadow: 0px 0px 0px white !important;
`

const StyledToolbar = styled(Toolbar)`
    background: white;
`

export default function Nav() {

    return (
        <StyledAppBar position="fixed">
            <StyledToolbar>
                <Typography variant="h6">
                    <StyledNoneLink to='/'>
                        <FontAwesomeIcon icon={faBook} transform="left-7"/>Bookipedia
                    </StyledNoneLink>
                </Typography>
            </StyledToolbar>
        </StyledAppBar>
    )

}