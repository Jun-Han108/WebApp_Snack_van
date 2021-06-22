import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Title = styled.h1`
	font-size: 32px;
`;

export const H1 = styled.h1`
	font-size:28px;
`;

export const H2 = styled.h2`
	font-size:24px;
`;

export const Division = styled.div`
	flex: 2;

	/* overflow-y: auto; */
	display: flex;
	justify-content: space-between;
	padding: 10px;

	&:hover {
	  cursor: pointer;
      background-color: lightgrey;
    }

	@media ${device.mobileS} {
		flex-direction:row-reverse;
	}

	@media ${device.mobileL} {
		flex-direction:row-reverse;
	}
	@media ${device.mobileM} {
		flex-direction:row-reverse;
	}

	@media ${device.laptop} {
		flex-direction: column;
	}

`;

export const PopDivision = styled.div`
	/* max-height: 20%; */
	
	flex: 2;

	/* overflow-y: auto; */
	display: flex;
	justify-content: space-between;

	@media ${device.mobileS} {
		flex-direction:column-reverse;
	}

	@media ${device.mobileL} {
		flex-direction:column-reverse;
	}
	@media ${device.mobileM} {
		flex-direction:column-reverse;
	}

	@media ${device.laptop} {
		flex-direction: row;

	}

`;

export const Img = styled.img`
	/* position: absolute;
	object-fit: cover;
	object-position: 15% 85%; */
	display: block;
	object-fit: cover;
	align-self: center;
	justify-content: center;
	align-items: center;
	overflow: hidden;


	@media ${device.mobileL} {
		width:100%;
		height:300px;
	}
	@media ${device.mobileS} {
		width:100%;
		height:250px;
	}

	@media ${device.mobileM} {
		width:100%;
		height:270px;
	}

	@media ${device.laptop} {
		height: 70vh;
		width:500px;
	}
`;


export const ImgDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;

`;


export const UL = styled.li`
	list-style-type: none;
	margin-top: 2%;
	margin-bottom: 2%;
`;

export const ImageBig = styled.img`
	display: block;
	/* width: 300px; */
	object-fit: cover;
	align-self: center;

	@media ${device.mobileS} {
		width:100px;
		height:100px;
		padding-left:5px;
	}
	@media ${device.mobileL} {
		height: 100px;
		width:100px;
		padding-left:5px;
	}
	@media ${device.mobileM} {
		height: 100px;
		width:100px;
		padding-left:5px;
	}

	@media ${device.laptop} {
		width: 100%;
		height: 200px;
		padding-left:0px;
	}
`;

export const Wrapper = styled.div`
	padding: 5%;
	padding-top: 3%;
	/* width: 80%; */
	align-self: center;
	align-items: center;
`;

export const DIV = styled.div`
	flex: 2;
	overflow-y: auto;
	display: flex;
	justify-content: space-between;
`;

export const LeftWrapper = styled.div`
	justify-content: center;
	min-width: 50%;
`;

export const RightWrapper = styled.div`
	justify-content: center;
	min-width: 10%;
`;

export const Buttons = styled.div`
	justify-content: center;
	padding-left: 33%;
	padding-right: auto;
`;

export const Table = styled.table`
	align-self: center;
	margin-left: auto;
	margin-right: auto;
`;

export const DIV2 = styled.div`
	padding: 5px;
	/* width: 25vw; */
	overflow: hidden;
`;

export const ROW = styled.div`
	display: grid;
	clear: both;
	align-self: center;

	@media ${device.mobileS} {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}
	@media ${device.mobileM} {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}

	@media ${device.laptop} {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 20px;
	}
`;

export const Price = styled.span`
	color: grey;
`;

export const MyButton = styled.button`
	display: inline-block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 25%;

	background-color: #aad9cd;
	color: white;
	padding: 7px 14px;
	transition: background 0.5s ease-in-out;
	width: 100%;
	border-radius: 10px;
	border: none;
	&:hover {
		color: black;
		background: #fff;
		cursor: pointer;
	}
`;

export const AddItem = styled.button`
	border-radius: 100%;
	width: 25px;
	height: 25px;

	background-color: #aad9cd;
	font-size: 20px;
	color: white;
	padding: 0;
	transition: background 0.5s ease-in-out;
	width: 100%;
	border-radius: 10px;
	border: none;
	&:hover {
		color: black;
		background: #fff;
	}
`;
