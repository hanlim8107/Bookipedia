import { useEffect } from "react";
import { selector, useRecoilValue } from "recoil";

import InfiniteScroll from "react-infinite-scroll-component";

import { searchValueSetter } from './SearchContainer'
import useDataApi from './custom/useDataApi'
import HomeView from '../View/HomeCardView.js'


const searchValueGetter = selector({
    key: "searchValueGetter",
    get: ({get}) => {
        return get(searchValueSetter)
    }
})


export default function Home() {
    const searchValue = useRecoilValue(searchValueGetter)
    const [{data, params}, setParams, dispatch] = useDataApi()


    useEffect(() => {
        dispatch({ type: 'FETCH_RESET' })
        setParams({
            start: 1,
            display: 30,
            ...searchValue
        })
        return 
    }, [searchValue])

    const increaseStartCount = () => {
        if (data.isStart === false) {
            return null
        }
        else {
            setParams({
                start: params.start + 30,
                display: 30,
                ...searchValue
            })
        } 
    }
    
    
    return (
        <InfiniteScroll
            dataLength={data.data !== undefined ? data.data.length : null}
            next={increaseStartCount}
            hasMore={true}
            style={{overflow: 'visible'}}
        >
            <HomeView data={data.data} isLoading={data.isLoading} isError={data.isError}/>
        </InfiniteScroll>
    )
}