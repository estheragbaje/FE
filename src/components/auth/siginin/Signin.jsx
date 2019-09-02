import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { LOGIN_MUTATION } from '../../../graphql/mutations';
import GoogleButton from '../../../assets/images/google-button.png';
import StyledSignin from './StyledSignin';
import TextInput from '../../common/TextInput';
import { trimError } from '../../../utils';

function Signin({ client }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = client;

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password,
        },
      });

      localStorage.setItem('token', res.data.userLogin.token);
      localStorage.setItem('username', res.data.userLogin.username);
      setSuccess(true);
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    toast.error(trimError(error.message) || 'Unable to Login, Try Again');
    setError(false);
  }

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <StyledSignin>
      <form
        className="text-center border border-light p-4 z-depth-1"
        action="#!"
        onSubmit={onSubmit}
      >
        <p className="h4 mb-4">Sign In</p>

        <TextInput
          title="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <TextInput
          title="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-group my-4">
          <button className="btn btn-info btn-block" type="submit">
            Sign In
          </button>
        </div>

        <div className="dividerContainer">
          <div className="divider">
            <hr />
          </div>
          <p className="font-weight-bold text-muted">OR</p>
          <div className="divider">
            <hr />
          </div>
        </div>

        <div className="d-flex optionalLoginContainer">
          <div className="optional-login">
            <a href="https://anonymous-feedback-app.herokuapp.com/google">
              <img src={GoogleButton} alt="Sign up with google" />
            </a>
          </div>
        </div>

        <p>
          <Link to="/resetPassword">Forgot Password?</Link>
        </p>

        <p>
          Don&apos;t have an account? &nbsp;
          <Link to="/register">
            <u>Sign Up</u>
          </Link>
        </p>
      </form>
    </StyledSignin>
  );
}

Signin.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(Signin);
