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

    // For start state
    let [start, setStart] = useState(1)
    // For set start state
    document.addEventListener('scroll', function() {
        let scrollEnd = document.documentElement.offsetHeight - document.documentElement.clientHeight
        if (document.documentElement.scrollTop === scrollEnd) {
            setStart(start + 30)
        }
    })

    // set home page book data
    useEffect(() => {
        setStart(1)
        setData()
        if (searchValue === "don't request") {
            return null
        } else {
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
        
    return (
            <HomeView data={data}/>
    )
}