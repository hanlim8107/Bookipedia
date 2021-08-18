// Axios
import axios from 'axios'
// xml2json
const convert = require('xml-js')

export default function HTTPRequest(object) {
    return (
        axios.get('/api/v1/search/book_adv.xml', {
            params: object,
            headers: {
                'X-Naver-Client-Id': 'QjlAszdDPfT3qjGeEtvD',
                'X-Naver-Client-Secret': 'UhuhXpfzTw'
            }
        })
        .then((res) => {
            var bookApi = convert.xml2js(res.data, {compact:true, spaces: 4})
            if (bookApi.rss.channel.item === undefined) {
                return undefined
            } else if (Array.isArray(bookApi.rss.channel.item) === false) {
                return [bookApi.rss.channel.item]
            } else {
                return bookApi.rss.channel.item
            }
        })
        .catch((res) => {
            return res.data
        })
    )
}