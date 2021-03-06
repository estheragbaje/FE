import { gql } from "apollo-boost";

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

const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($token: String!) {
    verifyAccount(token: $token) {
      id
      username
      email
      token
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

const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
      message
    }
  }
`;

const SET_NEW_PASSWORD = gql`
  mutation resetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token) {
      message
    }
  }
`;

const GOOGLE_AUTH_MUTATION = gql`
  mutation google {
    authGoogle {
      id
      username
      email
      token
    }
  }
`;

const SAVE_FEEDBACK = gql`
  mutation saveFeedback($input: FeedbackInput!) {
    saveFeedback(input: $input) {
      message
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $profileImage: String!
    $bio: String!
  ) {
    updateProfile(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      profileImage: $profileImage
      bio: $bio
    ) {
      username
      email
      firstName
      lastName
      profileImage
      bio
    }
  }
`;

export {
  CREATE_ACCOUNT,
  VERIFY_ACCOUNT,
  LOGIN_MUTATION,
  CREATE_NEW_SURVEY,
  GOOGLE_AUTH_MUTATION,
  SEND_RESET_PASSWORD_EMAIL,
  SET_NEW_PASSWORD,
  SAVE_FEEDBACK,
  UPDATE_PROFILE
};
