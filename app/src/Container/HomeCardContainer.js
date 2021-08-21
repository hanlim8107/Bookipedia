import { useState, useEffect } from 'react'
import {selector, useRecoilValue} from 'recoil'
import {searchValueSetter} from './SearchContainer'
import InfiniteScroll from "react-infinite-scroll-component";

import HomeView from '../view/HomeView.js'
import HTTPRequest from './function/HTTPRequest.js'


// Get global state 'searchValue' declared in 'SearchContainer.js'
const searchValueGetter = selector({
    key: 'searchValueGetter',
    get: ({get}) => {
        return get(searchValueSetter)
    }
})

export default function Home() {
    // ** Global state
    const searchValue = useRecoilValue(searchValueGetter)

    // ** Local state
    let [data, setData] = useState()
    let [start, setStart] = useState(1)

    // ** Set State
    // * Set 'data' when 'searchValue' change
    useEffect(() => {
        setStart(1)
        setData()
        if (searchValue === "don't request") {
            return null
        } 
        else {
            async function HTTPRequestForSetData() {
                let HTTPData = await HTTPRequest({
                    start: start,
                    display: 30,
                    ...searchValue
                })
                setData(HTTPData)
            }
            HTTPRequestForSetData()
        }
    }, [searchValue])

    // * Set 'data' when 'start' change
    useEffect(() => {
        if (searchValue === "don't request") {
            return null
        } 
        else if (start === 1) {
            return null
        }
        else {
            async function HTTPRequestForSetData() {
                let HTTPData = await HTTPRequest({
                    start: start,
                    display: 30,
                    ...searchValue
                })
                if (HTTPData !== undefined) {
                    setData([...data, ...HTTPData])
                }
            }
            HTTPRequestForSetData()
        }
    }, [start])

    // * set 'start' state when the scroll reaches the set threshold
    const increaseStartCount = () => {
        setStart(start + 30)
    }
    
    return (
        <InfiniteScroll
            dataLength={data !== undefined ? data.length : null}
            next={increaseStartCount}
            hasMore={true}
            style={{overflow: 'visible'}}
        >
            <HomeView data={data}/>
        </InfiniteScroll>
    )
}