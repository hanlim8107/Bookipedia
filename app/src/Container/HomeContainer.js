import { useState, useEffect } from 'react'
// import HomeView.js
import HomeView from '../view/HomeView.js'
// styled components
import styled from 'styled-components'
// Material-UI Component
import TextField from '@material-ui/core/TextField';
// Axios
import axios from 'axios'
// xml2json
const convert = require('xml-js')

// Styling
const StyledTextField = styled(TextField)`
    margin-top: 10px;
    width: 100%;
`

export default function Home() {
    // For homepage bookdata rendering
    let [data, setData] = useState()

    // For input value
    let [inputValue, setInputValue] = useState()

    // set home page book data
    useEffect(() => {
        axios.get('/api/v1/search/book_adv.xml', {
            params: {
                display: 100,
                start: 1,
                d_titl: inputValue
            },
            headers: {
                'X-Naver-Client-Id': 'QjlAszdDPfT3qjGeEtvD',
                'X-Naver-Client-Secret': 'UhuhXpfzTw'
            }
        })
        .then((res) => {
            var bookApi = convert.xml2js(res.data, {compact:true, spaces: 4})
            if (bookApi.rss.channel.item === undefined) {
                setData(undefined)
            } else if (Array.isArray(bookApi.rss.channel.item) === false) {
                setData([bookApi.rss.channel.item])
            } else {
                setData(bookApi.rss.channel.item)
            }
        
        })
        .catch((res) => {
            console.log(res)
        })
    }, [inputValue])
        
    return (
        <div>
            <StyledTextField id="outlined-basic" label="제목을 입력하세요" variant="outlined" onChange={(e) => {
                setInputValue(e.target.value)
            }}/>
            <HomeView  data={data} />
        </div>
    )
}