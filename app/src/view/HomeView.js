import { Link } from 'react-router-dom'
// styled components
import styled from 'styled-components'
// Material-UI Component
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';


// Styling
const StyledCard = styled(Card)`
    width: 300px;
    margin: 40px;
`

const NoResult = styled.p`
    margin-top: 500px;
    margin: auto;
`


export default function HomeView({data}) {
    
    return (
        <Grid 
            container 
            spacing={2}
            direction='row'
        > 
            {
            data !== undefined
            ? data.map((data) => {
                return (
                    <Grid item xs={3}>
                        <Link className="nav-link" to={`/detail/${data.isbn._text}`}>
                            <StyledCard>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={data.image._text}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        {data.title._text}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        {data.author._text}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        {data.pubdate._text}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </StyledCard>
                        </Link>
                    </Grid>
                )
            })
            : <NoResult>검색결과가 없습니다</NoResult>
            }
        </Grid>
    )
}