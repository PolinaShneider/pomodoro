import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const MenuWrapperDiv = styled.div`
  box-sizing: border-box;
  width: 350px;
  height: 300px;
  border: 3px solid black;
  border-radius: 10px;
  background: whitesmoke;
  overflow-y: hidden;

  h4 {
    margin: 15px;
  }

  div {
    margin: 0 15px;
  }

  section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
`;

const Title = styled.h3``;

const Cross = styled.button`
  height: 50%;
  margin: 0;
  background: white;
`;

const TopBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;

  h3 {
    margin: 0;
  }
`;

const Divider = styled.hr`
  margin: 0 15px;
  border: none;
  background-color: rgba(96, 102, 110, .5);
  height: 1px;
`;

export default ({title, onCrossClick, children}) =>
    <Menu>
        <MenuWrapperDiv>
            <TopBlock>
                <Title>{title}</Title>
                <Cross onClick={onCrossClick}>x</Cross>
            </TopBlock>
            <Divider/>
            {children}
        </MenuWrapperDiv>
    </Menu>
