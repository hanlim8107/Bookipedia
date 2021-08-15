import StyledNoneLink from './reusable/Link'
// styled components
import styled from 'styled-components'
// Material-UI Component
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';


// Styling
const CardWrap = styled(Grid)`
    margin-top: 120px !important;
`

const StyledCard = styled(Card)`
    width: 300px;
    margin: 50px auto;
    box-shadow: 0px 0px 0px black !important;
`

const CardImage = styled(CardMedia)`
    width: 300px;
    height: 300px;
    object-fit: fill !important;
`

const NoResult = styled.p`
    margin-top: 500px;
    margin: auto;
`

const StyledTypography = styled(Typography)`
    padding: 5px 1px;
    font-size: 14px !important;
    font-weight: bold !important;
    overflow: hidden;
    white-space: nowrap;
`


export default function HomeView( { data } ) {

    return (
        <CardWrap
            container 
            spacing={2}
            direction='row'
        > 
            {
            data !== undefined
            ? data.map((data) => {
                return (
                    <Grid item xs={12} sm={6} lg={3}>
                        <StyledNoneLink className="nav-link" to={`/detail/${data.isbn._text}`}>
                            <StyledCard>
                                <CardActionArea>
                                    <CardImage
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={data.image._text}
                                        title="Contemplative Reptile"
                                    />
                                    <StyledTypography gutterBottom variant="h5" component="h2">
                                        {data.title._text.replace('<b>', '').replace('</b>', '')}
                                    </StyledTypography>
                                </CardActionArea>
                            </StyledCard>
                        </StyledNoneLink>
                    </Grid>
                )
            })
            : <NoResult>검색결과가 없습니다</NoResult>
            }
        </CardWrap>
    )
}