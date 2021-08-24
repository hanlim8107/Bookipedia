import {useEffect, useState} from 'react'
import {atom, useRecoilState} from 'recoil'
import {debounce} from 'lodash'
// styled components
import styled from 'styled-components'
// Material-UI Component
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// Styling
const SearchWrap = styled.div`
    display: flex;
    position: fixed !important;
    top: 64px !important;
    z-index: 2;
    width: 100%;
    background-color: white;

    @media screen and (max-width: 600px) {
        top: 56px !important;
    }
`
const StyledTextField = styled(TextField)`
    margin-top: 6px !important;
    width: 75%;
    border-radius: 0px 3px 3px 0px !important;
`
const StyledFormControl = styled(FormControl)`
    margin-top: 6px !important;
    width: 23%;
`


// Set global state 'searchValue' for rendering home card
const searchValueSetter = atom({
    key: 'SearchValueSetter',
    default: "don't request"
})


function SearchInput() {
    // ** Global state
    let [searchValue, setSearchValue] = useRecoilState(searchValueSetter)

    // ** Local state
    let [selectValue, setSelectValue] = useState('d_titl')
    let [inputValue, setInputValue] = useState('')

    // ** Set State
    // *  Set 'selectValue' and 'history' when select box change
    const selectOnChange = (e) => {
        setSelectValue(e.target.value)
    }

    // *  Set 'inputValue' and 'history' when search box change
    const inputOnChange = debounce((e) => {
        setInputValue(e.target.value)
    }, 1000)

    // *  Set 'searchValue' when 'selectValue' and 'inputValue' change
    useEffect(() => {
        // - To prevent unnecessary HTTP requests during initial rendering or when the search bar is empty
        if (inputValue === '') {
            setSearchValue("don't request")
        }
        else {
            let searchCondition = {};
            searchCondition[selectValue] = inputValue;

            setSearchValue(searchCondition);
        }
        
    }, [selectValue, inputValue])

    // ** Variable
    // *  Variable for option value -> MenuItem Value
    let titleCondition = 'd_titl'
    let authorCondition = 'd_auth'

    return (
            <SearchWrap>
                <StyledFormControl variant="outlined">
                    <Select defaultValue={titleCondition} onChange={selectOnChange}>
                        <MenuItem value={titleCondition}>제목 검색</MenuItem>
                        <MenuItem value={authorCondition}>작가 검색</MenuItem>
                    </Select>
                </StyledFormControl>
                <StyledTextField label="검색어을 입력하세요" variant="outlined" onInput={inputOnChange}/>
            </SearchWrap>
    )
}


export {searchValueSetter, SearchInput}
