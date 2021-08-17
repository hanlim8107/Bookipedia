import {useState, useEffect} from 'react'
// styled components
import styled from 'styled-components'
// Material-UI Component
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


// Styling
const StyledGrid = styled(Grid)`
    margin: 70px auto !important;
    max-width: 1000px;
`

const StyledImage = styled(CardMedia)`
    margin: auto;
    width: 153px !important;
    height: 221px;
    object-fit: fill !important;
`

const StyledTitle = styled(Typography)`
    margin-top: 80px !important;
    font-size: 15px !important;
    font-weight: bold !important;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
`

const StyledAuthor = styled(Typography)`
    font-size: 12px !important;
    text-align: center;
`

const TextBox = styled.div`
    margin: auto;
    width: 500px;
`


export default function DetailView({detailData}) {
    let [pubDate, setPubDate] = useState([])
    useEffect(() => {
        if (detailData !== undefined) {
            return setPubDate(detailData.pubdate._text.match(/\d{2}/g))
        } else {
            
        }
    }, [detailData])

    return (
        <div>
            {
            detailData !== undefined

            ?   <div>
                    <StyledGrid 
                        container
                        direction='row'
                        justifyContent='center'
                    >
                        <Grid item xs={12} sm={3}>
                            <StyledImage
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={detailData.image._text}
                            title="Contemplative Reptile"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <StyledTitle gutterBottom variant="h5" component="h2">
                                {detailData.title._text.replace('<b>', '').replace('</b>', '').replace(/\((.*)\)/gi, '')}
                            </StyledTitle>
                            <StyledAuthor gutterBottom variant="h5" component="h2">
                                {detailData.author._text}
                            </StyledAuthor>
                        </Grid>
                    </StyledGrid>
                    <TextBox>
                        <h3>상세정보</h3>
                        <p>{detailData.description._text}</p>
                    </TextBox>
                    <TextBox>
                        <h3>출판사</h3>
                        <p>{detailData.publisher._text}</p>
                    </TextBox>
                    <TextBox>
                        <h3>출간일</h3>
                        <p>{pubDate[0] + pubDate[1] + '년 ' + pubDate[2] + '월 ' + pubDate[3] + '일'}</p>
                    </TextBox>
                </div>

            :   null
            }
        </div>
    )
}