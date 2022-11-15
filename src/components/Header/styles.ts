import styled from "styled-components";

export const Container = styled.header`
  background: #d73035;
  height: 198px;

  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-details {
    h1 {
      font-weight: 600;
      font-size: 32px;
      line-height: 120%;
      color: #ffffff;
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      opacity: 0.9;
      color: #ffffff;
      margin-top: 6px;
    }
  }
`;
