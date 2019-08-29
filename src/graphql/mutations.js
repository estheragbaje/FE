import { gql } from 'apollo-boost';

const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      username
      email
      id
      token
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      username
      email
      id
    }
  }
`;

const CREATE_NEW_SURVEY = gql`
  mutation createNewSurvey($input: SurveyInput!) {
    createNewSurvey(input: $input) {
      id
      title
      questions {
        question
        type
      }
    }
  }
`;

const GOOGLE_AUTH_MUTATION = gql`
  mutation google{
  authGoogle{
    id
    username
    email
    token
  }
}
`;

export {
  CREATE_ACCOUNT,
  LOGIN_MUTATION,
  CREATE_NEW_SURVEY,
  GOOGLE_AUTH_MUTATION,
};
