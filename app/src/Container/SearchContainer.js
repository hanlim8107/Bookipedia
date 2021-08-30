import {useEffect, useState} from 'react'
import { atom, useRecoilState } from 'recoil'

import SearchView from '../View/SearchView'

import {debounce} from 'lodash'

const searchValueSetter = atom({
    key: "searchValueSetter",
    default: "don't request"
})


function SearchInput() {
    const [searchValue, setSearchValue] = useRecoilState(searchValueSetter)
    // ** Local state
    const [selectValue, setSelectValue] = useState('d_titl')
    const [inputValue, setInputValue] = useState('')


    const selectOnChange = (e) => {
        setSelectValue(e.target.value)
    }

    const inputOnChange = debounce((e) => {
        setInputValue(e.target.value)
    }, 1000)

    useEffect(() => {
        const searchCondition = {}
        searchCondition[selectValue] = inputValue

        setSearchValue(searchCondition)
    }, [selectValue, inputValue])


    return (
           <SearchView selectOnChange={selectOnChange} inputOnChange={inputOnChange}/> 
    )
}


export { SearchInput, searchValueSetter }
