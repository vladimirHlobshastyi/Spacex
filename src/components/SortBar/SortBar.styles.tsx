import styled from "styled-components";


export const SortButton = styled.div`
display: block;
display: flex;
justify-content: center;
align-items: center;
width: 55px;
height: 28px;
margin: 0 20px;
background: rgb(110, 110, 110);;
color: white;
border-radius: 4px;
&:hover{
background: rgb(186, 186, 186);
cursor: pointer;
}
`

export const SortBarContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 15px;
background-color:#d8d8d8;
`

export const Select = styled.select`
height: 28px;
`

export const Option = styled.option`
width: 55px;`