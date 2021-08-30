import { useState, useEffect, useReducer } from 'react'

import axios from 'axios'
const convert = require('xml-js')

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_RESET':
            return {
                isLoading: false,
                isError: false,
                data: [],
            }
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'FETCH_SUCCESS':
            return {
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            throw new Error()
    }
}

const useDataApi = () => {
    const [params, setParams] = useState({
        start: 1,
        display: 30,
        d_titl: ''
    })
    const [data, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: []
    })

    useEffect(() => {
        if (params.d_titl === '' || params.d_auth === '') {
            return null
        }
        else {
            async function HTTPRequestForSetData(params) {
                dispatch({ type: 'FETCH_INIT' })
        
                let HTTPData = await axios.get('/api/v1/search/book_adv.xml', {
                    params: params,
                    headers: {
                        'X-Naver-Client-Id': 'QjlAszdDPfT3qjGeEtvD',
                        'X-Naver-Client-Secret': 'UhuhXpfzTw'
                    }
                })
                .then((res) => {
                    let bookApi = convert.xml2js(res.data, {compact:true, spaces: 4})
                    let bookItems = bookApi.rss.channel.item
        
                    if (bookItems === undefined) {
                        dispatch({ type: 'FETCH_SUCCESS', payload: [...data.data] })
                    } 
                    else if (Array.isArray(bookItems) === false) {
                        dispatch({ type: 'FETCH_SUCCESS', payload: [...data.data, bookItems] })
                    } 
                    else {
                        dispatch({ type: 'FETCH_SUCCESS', payload: [...data.data, ...bookItems] })
                    }
                })
                .catch((res) => {
                    dispatch({ type: 'FETCH_FAILURE', payload: res.data})
                })
            }
            HTTPRequestForSetData(params)
        }

    }, [params])

    return [{data, params}, setParams, dispatch]
}

export default useDataApi