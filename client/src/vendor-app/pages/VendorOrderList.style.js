import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Title = styled.h1`
  font-size: 32px;
`;

export const LeftWrapper = styled.div`
  justify-content: center;
  min-width: 50%;
`;

export const Container = styled.div`
  height: 100vh;
  position: relative;
  flex: 1;
  flex-direction: column;
  display: flex;
  padding: 1%;
  margin-top: 0.5%;
  margin-bottom: 5%;
  margin-left: auto;
  margin-right: auto;
  @media ${device.mobileS} {
    height: 100%;
  }
  @media ${device.tablet} {
    width: 90vw;
  }
  @media ${device.mobileM} {
    height: 100%;
  }

  @media ${device.laptop} {
    width: 80vw;
  }
`;

export const Division = styled.div`
  /* max-height: 20%; */
  flex: 3;
  /* overflow-y: auto; */
  display: flex;
  justify-content: space-between;
  /* margin: 10px;
  padding: 10px; */
`;



export const InnerDiv = styled.div`
  /* margin-left: auto;
  margin-right: auto; */
`;

export const ButtonDiv = styled.div`
  padding: 10px;
  /* margin-left: auto;
  margin-right: auto; */
`;

export const InnerDivButtons = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

export const OrderTitle = styled.h1`

  text-align: left;
  font-size: 22px;
  font: roboto (to be changed);
  margin-top: 2%;
  margin-bottom: 0.5%;
`;

export const OrderList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 5px;
  padding-left: 15px;
  margin-bottom: 5%;
`;
export const OrderItem = styled.li`
  font-size: 18px;
  list-style-type: none;
  margin-bottom: 5%;
  margin-top: 5%;
`;

export const InnerDivBot = styled.div`
  @media ${device.laptop} {
    position: absolute;
    bottom: 20%;
  }

  @media ${device.tablet} {
    position: absolute;
    bottom: 20%;
  }
`;

export const FoodItem = styled.li`
  font-size: 18px;
  list-style-type: none;
  color: grey;
  margin-left: auto;
  margin-right: auto;
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

export const DeclineMessage = styled.p`
  font-size: 18px;
  color: red;
  text-align: left;
`;

export const MyButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  background-color: #aad9cd;
  color: white;
  padding: 7px 14px;
  transition: background 0.1s ease-in-out;

  border-radius: 10px;
  border: none;
  &:hover {
    color: black;
    background: #fff;
  }
`;
