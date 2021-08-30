import StyledNoneLink from './reusable/Link'
import LoadingSpinner from './reusable/LoadingSpinner';
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
    position: absolute;
    top: 300px;
    left: 44vw;
`

const StyledTypography = styled(Typography)`
    padding: 5px 1px;
    font-size: 14px !important;
    font-weight: bold !important;
    overflow: hidden;
    white-space: nowrap;
`

const LoadingSpinnerWrap = styled.div`
    width: 40px;
    margin: 190px auto;
`


export default function HomeView( { data, isLoading, isError } ) {
    
    return (
        <>
            <CardWrap
                container 
                spacing={2}
                direction='row'
            >
                {
                data.map((data, index) => {
                    return (
                        <Grid item xs={12} sm={6} lg={3} key={index}>
                            {}
                            <StyledNoneLink className="nav-link" to={`/detail/${data.title._text.replace('<b>', '').replace('</b>', '')}`}>
                                <StyledCard>
                                    <CardActionArea>
                                        <CardImage
                                            component="img"
                                            image={data.image._text}
                                            onError={(e) => {e.target.src='image/no-image.jpeg'}}
                                        />
                                        <StyledTypography gutterBottom variant="h5" component="h2">
                                            {data.title._text.replace('<b>', '').replace('</b>', '').replace(/\((.*)\)/gi, '')}
                                        </StyledTypography>
                                    </CardActionArea>
                                </StyledCard>
                            </StyledNoneLink>
                        </Grid>
                    )
                })
                }
            </CardWrap>
            {data[0] === undefined && !isLoading && <NoResult>검색 결과가 없습니다</NoResult>}
            {isLoading 
             && <LoadingSpinnerWrap>
                    <LoadingSpinner/>
                </LoadingSpinnerWrap>  
            }
        </>
    )
}