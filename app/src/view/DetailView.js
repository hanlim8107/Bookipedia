import { useState } from 'react';
// styled components
import styled from 'styled-components'
// Material-UI Component
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


// Styling
const StyledGrid = styled(Grid)`
    margin: auto;
`

const Summary = styled(Typography)`
    height: 50px;
    cursor: pointer;

    overflow: ${(props) => { if (props.overflow) { return 'hidden' } else { return 'visible'} }}
`


export default function DetailView({detailData}) {
    // Summary overflow Animation
    let [overflow, setOverflow] = useState(true)
    console.log(detailData)

    return (
        <div>
            {
            detailData !== undefined

            ?   <StyledGrid container spacing={2}>
                    <Grid item xs={4}>
                        <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={detailData.image._text}
                        title="Contemplative Reptile"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {detailData.title._text}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                        {detailData.author._text}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                        {detailData.pubdate._text}
                        </Typography>
                        <Summary gutterBottom variant="h5" component="h2" overflow={overflow} onClick={() => {
                            setOverflow(!overflow)
                        }}>
                        {detailData.description._text}
                        </Summary>
                        <Typography gutterBottom variant="h5" component="h2">
                        {detailData.publisher._text}
                        </Typography>
                    </Grid>
                </StyledGrid>

            :   null
            }
        </div>
    )
}