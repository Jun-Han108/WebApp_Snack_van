import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Title = styled.h1`
  font-size: 32px;
  padding-left: 20px;
`;

export const Status = styled.h3`
  text-align: right;
  font-size: 18px;
  color: #75c1ae;
  margin-top: 5px;
  margin-bottom: 3px;
`;

export const Wrapper = styled.div`
  max-width:95vw;
  margin-left:auto;
  margin-right:auto;
`;

export const Container = styled.div`
  height: 100vh;
  position: relative;
  flex: 1;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin-top: 0.5%;
  margin-bottom: 5%;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;

  @media ${device.mobileS} {
    height: 100%;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
  @media ${device.mobileM} {
    height: 100%;
  }

  @media ${device.laptop} {
    width: 100%;
  }
`;

export const Division = styled.div`
  /* max-height: 20%; */
  display: flex;
  align-items: center;
  flex: 2;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  box-shadow: 2px 2px 2px 2px lightgrey;

  @media ${device.mobileS} {
    font-size: 12px;
    width: 85vw;
  }
  @media ${device.mobileM} {
    font-size: 12px;
    width: 85vw;
  }
  @media ${device.mobileL} {
    font-size: 12px;
    width: 85vw;
  }

  @media ${device.laptop} {
    font-size: 18px;
    width: 70vw;
  }
`;

// export const InnerDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-right: 10px;
//   margin-left: auto;
//   padding: 0px;
// `;

export const TopDiv = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  justify-content: space-between;
  @media ${device.mobileS} {
    width: 90vw;
  }
  @media ${device.mobileM} {
    width: 90vw;
  }

  @media ${device.laptop} {
    width: 70vw;
  }
`;

export const OrderTitle = styled.h1`
  text-align: left;
  font-size: 20px;
  font: roboto (to be changed);
  padding-left: 5px;
  margin-top: 2%;
  margin-bottom: 0.5%;
`;


export const ButtonDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  align-self: right;
`;

export const OrderList = styled.ul`
  align-self: left;
  list-style: none;
  margin: 0;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const OrderItem = styled.li`
  font-size: 18px;
  color: grey;
  list-style-type: none;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

export const OrderPrice = styled.li`
  font-size: 18px;
  display: inline-block;
`;

export const BreakLine = styled.hr`
  min-width: 100%;
  border: 0.8px solid #b9b9b9;
`;

export const ListTitle = styled.li`
  font-size: 20px;
  margin: auto;
  font-weight: bold;
  list-style-type: none;
`;

export const DivisionBottom = styled.div`
  max-height: 10%;
  flex: 2;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
`;

export const DiscountMessage = styled.h2`
  font-size: 15px;
  text-align: left;
`;

export const Total = styled.h2`
  font-size: 15px;
  text-align: right;
`;

export const TotalPrice = styled.h2`
  font-size: 18px;
  text-align: right;
`;

export const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 70px;
  height: 90px;
`;

export const Time = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const MyButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  background-color: #aad9cd;
  color: white;
  padding: 7px 14px;
  transition: background 0.5s ease-in-out;
  width: 37%;
  border-radius: 10px;
  border: none;
  &:hover {
    color: black;
    background: #fff;
  }
`;
