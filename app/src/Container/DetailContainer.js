import { useState, useEffect } from 'react';
import DetailView from '../view/DetailView'
// Axios
import axios from 'axios'
// xml2json
const convert = require('xml-js')

export default function Detail( { match } ) {
  
    // For detailpage bookdata rendering
    let [detailData, setDetailData] = useState()
    useEffect(() => {
      axios.get('/api/v1/search/book_adv.xml', {
        params: {
          d_isbn: match.params.isbn
        },
        headers: {
          'X-Naver-Client-Id': 'QjlAszdDPfT3qjGeEtvD',
          'X-Naver-Client-Secret': 'UhuhXpfzTw'
        }
      })
      .then((res) => {
        let bookApi = convert.xml2js(res.data, {compact:true, spaces: 4})
        setDetailData(bookApi.rss.channel.item)
      })
      .catch((res) => {
        console.log(res.data)
      })
    }, [])
    console.log('container', detailData)
  
    return <DetailView detailData={detailData} />
}