import {useState} from 'react'
import {atom, useRecoilState} from 'recoil'
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


// set atomState
const searchValueSetter = atom({
    key: 'SearchValueSetter',
    default: "don't request"
})


function SearchInput() {
    // For Select Value
    let titleCondition = 'd_titl'
    let authorCondition = 'd_auth'
    let [selectValue, setSelectValue] = useState('d_titl')
    // For set selectValue
    const selectOnChange = (e) => {
        setSelectValue(e.target.value)
    }

    // For Search value
    let [searchValue, setSearchValue] = useRecoilState(searchValueSetter)
    // For set searchValue
    const inputOnChange = (e) => {
        setTimeout(() => {
            let searchCondition = {};
            searchCondition[selectValue] = e.target.value
            setSearchValue(searchCondition);
        }, 1500)
    }

    return (
            <SearchWrap>
                <StyledFormControl variant="outlined">
                    <Select defaultValue={titleCondition} onChange={selectOnChange}>
                        <MenuItem value={titleCondition}>제목 검색</MenuItem>
                        <MenuItem value={authorCondition}>작가 검색</MenuItem>
                    </Select>
                </StyledFormControl>
                <StyledTextField label="검색어을 입력하세요" variant="outlined" onChange={inputOnChange}/>
            </SearchWrap>
    )
}


export {searchValueSetter, SearchInput}
