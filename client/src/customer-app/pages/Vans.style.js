import styled from "styled-components";

export const PopUpHeader = styled.div`
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
`;

export const PopUpTitle = styled.p`
	font-size: 2.7rem;
	font-weight: bold;
  text-align: center;

`;

export const PopUpRating = styled.p`
margin-top: -0.03px;
	font-size: 2.7rem;
	font-weight: bold;
  text-align: center;
`;

export const PopUpCloseButton = styled.button`
	cursor: pointer;
	border: none;
	outline: none;
	background: none;
	font-size: 1.25rem;
	font-weight: bold;
`;



export const PopUpBody = styled.div`
	padding: 10px 15px;

	
`;

export const OrderButton = styled.button`
border: none;
	cursor: pointer;
	font-size: 2rem;
	font-weight: bold;
  margin-left: 28%;
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 10px;
  background-color: #aad9cd;
  align-items: center;
  transition: background 0.5s ease-in-out;
  &:hover {
		color:  #aad9cd;
    background-color: white;

	}

`;

export const SlideWrapper = styled.div`

`;


export const SlideDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  height: 300px;
  width: 60%;
  margin-left: 19%;
  border-radius: 10px;
  border: 5px solid #ddd;  
`;


export const VanDescription = styled.div`
margin-top: -35px;
margin-left: 10px;
   
`;


