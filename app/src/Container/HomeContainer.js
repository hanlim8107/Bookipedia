import { useState, useEffect } from 'react'

import HomeView from '../view/HomeView.js'
import HTTPRequest from './function/HTTPRequest.js'


export default function Home({inputValue}) {

    // For homepage bookdata rendering
    let [data, setData] = useState()

    // set home page book data
    useEffect(() => {
        async function HTTPRequestForSetData() {
            let HTTPData = await HTTPRequest({
                start: 1,
                display: 100,
                d_titl: inputValue
            })
            setData(HTTPData)
        }
        HTTPRequestForSetData()
    }, [inputValue])
        
    return (
        <div>
            <HomeView  data={data} />
        </div>
    )
}