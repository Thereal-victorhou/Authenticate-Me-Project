import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoLogin = async (e) => {
    e.preventDefault();
    const userName = 'Demo User';
    const password = 'password';
    return dispatch(sessionActions.login({ credential: userName, password: password }))
  }

  return (
    <div className="login_form_container">
        <div className="login_left">
          <form onSubmit={handleSubmit}>
            <div className="login_text">
              <div className="login_header">
                <h2>Log in to Kelp</h2>
              </div>
              <div className="login_signup">
                <h4>New to Kelp? <a href="/signup"> Sign up</a></h4>

              </div>
              <div className="login_disclaimer">
                <p>By logging in, you agree to Kelp's
                  <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/"> Terms of Service </a>
                  and
                  <a href="https://terms.yelp.com/privacy/en_us/20200101_en_us/"> Privacy Policy</a>.
                </p>

              </div>
            </div>
            <button className="demo_login" onClick={demoLogin}>
              <h4>Continue with Demo User</h4>
            </button>
            {/* <div className="login_divider">
              <hr></hr>
              <p>OR</p>
              <p>______________</p>
            </div> */}
            <fieldset className="login_divider">
              <legend align="center">OR</legend>
            </fieldset>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              />
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="login_right">

        </div>
      </div>
  );
}

export default LoginFormPage;
