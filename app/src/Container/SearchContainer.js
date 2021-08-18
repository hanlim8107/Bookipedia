import {useState} from 'react'
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


export default function SearchInput() {

    // For input value
    let [inputValue, setInputValue] = useState()

    return (
        <div>
            <TextFieldWrap>
                <StyledTextField id="outlined-basic" label="제목을 입력하세요" variant="outlined" onChange={(e) => {
                    setInputValue(e.target.value)
                }}/>
            </TextFieldWrap>
            <Home inputValue={inputValue}/>
        </div>
    )
}
