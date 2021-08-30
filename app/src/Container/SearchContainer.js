import {useEffect, useState} from 'react'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import SearchView from '../View/SearchView'

import {debounce} from 'lodash'


const { persistAtom } = recoilPersist()
const searchValueSetter = atom({
    key: "searchValueSetter",
    default: {d_titl: ''},
    effects_UNSTABLE: [persistAtom],
})


function SearchInput() {
    const [searchValue, setSearchValue] = useRecoilState(searchValueSetter)
    // ** Local state
    const [selectValue, setSelectValue] = useState('d_titl')
    const [inputValue, setInputValue] = useState("don't change")


    const selectOnChange = (e) => {
        setSelectValue(e.target.value)
    }

    const inputOnChange = debounce((e) => {
        setInputValue(e.target.value)
    }, 1000)

    useEffect(() => {
        if (inputValue === "don't change") {
            return null
        }
        else {
            const searchCondition = {}
            searchCondition[selectValue] = inputValue

            setSearchValue(searchCondition)
        }  
    }, [selectValue, inputValue])


    return (
           <SearchView selectOnChange={selectOnChange} inputOnChange={inputOnChange}/> 
    )
}


export { SearchInput, searchValueSetter }
