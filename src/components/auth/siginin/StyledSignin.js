import styled from 'styled-components';

const Signup = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  form {
    /* border: none; */
    background: white;
    width: 35%;
    padding-top: 4rem !important;
    a:hover {
      text-decoration: underline;
    }

    @media (max-width: 1400px) {
      width: 60%;
    }

    @media (max-width: 1200px) {
      width: 70%;
    }

    @media (max-width: 1050px) {
      width: 85%;
    }

    @media (max-width: 870px) {
      width: 95%;
    }

    @media (max-width: 500px) {
      width: 100%;
      padding: 1rem !important;
    }
  }

  .passwordContainer {
    width: 48%;
  }

  .dividerContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .divider {
      width: 47%;

      &:nth-of-type(2) {
        padding-left: 1rem;
      }

      &:first-child {
        padding-right: 1rem;
      }
    }
  }

  .optionalLoginContainer {
    margin: 1rem auto;

    @media (max-width: 780px) {
      flex-direction: column;
      align-items: center;
    }
    .optional-login {
      width: 100%;
      img {
        width: 300px;
        @media (max-width: 450px) {
          width: 200px;
        }
      }
    }
  }
`;

export default Signup;
