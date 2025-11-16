import styled from "styled-components";
import { Link } from "react-router-dom";

const defaultBackgroundColor = "#EDF6E9";
const sideBarBackgroundColor = "#CBE0C2";
const topbarHeight = "50px";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: auto;
  background-color: ${(props) => props.color || defaultBackgroundColor};

  .header {
    display: flex;
    height: ${topbarHeight};
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0%;
    padding: 10px 30px;
  }

  .body {
    margin-top: ${topbarHeight};
    height: calc(100vh - ${topbarHeight} - 48px);
  }

  .footer {
    text-align: center;
  }
`;
export const UserContainer = styled.div`
  display: flex;
  margin: 40px 20px;
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

export const ActLogIcon = styled.span`
  width: 50px;
  height: 50px;
`;

export const StyledSideBar = styled.div`
  color: #303030ff;
  position: fixed;
  left: 0;
  top: ${topbarHeight};
  width: 250px;
  height: calc(100vh - ${topbarHeight});
  background-color: ${sideBarBackgroundColor};
  /* box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5); */
  z-index: 1000;
  /* border-top-right-radius: 10px; */
  /* transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease; */
`;

export const StyledMenuLIst = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledMenuItem = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid #a8c698;
  display: flex;
  align-items: center;
`;
export const StyledMenuIcon = styled.span`
  margin-right: 10px;
`;

export const StyledLink = styled(Link)`
  // 줌링크?
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #212121ff;
  }
`;
