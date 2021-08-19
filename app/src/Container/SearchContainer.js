import {useState} from 'react'
import {atom, useRecoilState} from 'recoil'
import Home from './HomeContainer'
// styled components
import styled from 'styled-components'
// Material-UI Component
import TextField from '@material-ui/core/TextField';

// Styling
const TextFieldWrap = styled.div`
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
    width: 98%;
`

// set atomState
const searchValueSetter = atom({
    key: 'SearchValueSetter',
    default: ''
})

function SearchInput() {
    // For input value
    let [searchValue, setSearchValue] = useRecoilState(searchValueSetter)

    // For setsearchValue
    const onChange = (e) => {
        setTimeout(() => {
            setSearchValue(e.target.value);
        }, 1500)
    }

    return (
            <TextFieldWrap>
                <StyledTextField id="outlined-basic" label="제목을 입력하세요" variant="outlined" onChange={onChange}/>
            </TextFieldWrap>
    )
}


export {searchValueSetter, SearchInput}
