import styled from "styled-components";


export const InfoContainer = styled.div`
position: fixed;
top:0;
left:0;
background: #dadada75;
width:100vw;
height: 100vh;
z-index:5;
`
export const InfoWrapper = styled.div`
position:absolute;
display:block;
display:flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
top:35%;
left:35%;
width: 30%;
height: 30%;
margin-top: 15px;
background:grey;
color:white;
border-radius: 25px;
z-index:23;`

export const InfoWrapperName = styled.div``
export const InfoWrapperisSuccess = styled.div``
export const InfoWrapperdateLocal = styled.div``
export const InfoWrapperdateLink = styled.a`
text-decoration:none;
`
export const InfoCloseContainer = styled.div`
position: absolute;
top: 15px;
right: 15px;
width:15px;
height:15px;
&:hover{
    cursor: pointer;
}
`
export const InfoCloseImg = styled.img`
width: 100%;
`

