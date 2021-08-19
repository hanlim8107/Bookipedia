import { useState, useEffect } from 'react'
import {selector, useRecoilValue} from 'recoil'
import {searchValueSetter} from './SearchContainer'

import HomeView from '../view/HomeView.js'
import HTTPRequest from './function/HTTPRequest.js'


// get searchValue from SearchContainer.js using recoil
const searchValueGetter = selector({
    key: 'searchValueGetter',
    get: ({get}) => {
        return get(searchValueSetter)
    }
})

export default function Home() {
    // For searchValue
    const searchValue = useRecoilValue(searchValueGetter)
    // For homepage bookdata rendering
    let [data, setData] = useState()

    // set home page book data
    useEffect(() => {
        async function HTTPRequestForSetData() {
            let HTTPData = await HTTPRequest({
                start: 1,
                display: 100,
                d_titl: searchValue
            })
            setData(HTTPData)
        }
        HTTPRequestForSetData()
    }, [searchValue])
        
    return (
        <div>
            <HomeView data={data}/>
            {console.log()}
        </div>
    )
}