import { user } from "pg/lib/defaults";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [monthNum, setMonthNum] = useState(0)
  const [month, setMonth] = useState("");
  const [dayTracker, setDayTracker] = useState("");
  const [yearTracker, setYearTracker] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      setErrors([]);
      const userBirthday = `${month}-${dayTracker}-${yearTracker}`;
      return dispatch(sessionActions.signup({ email, firstName, lastName, password, zipCode, userBirthday }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const renderDate = (type) => {
    switch (type) {
      case "month":
        return (
          <>
            <option value="1"> January </option>
            <option value="2"> Febuary </option>
            <option value="3"> March </option>
            <option value="4"> April </option>
            <option value="5"> May </option>
            <option value="6"> June </option>
            <option value="7"> July </option>
            <option value="8"> August </option>
            <option value="9"> September </option>
            <option value="10"> October </option>
            <option value="11"> November </option>
            <option value="12"> December </option>
          </>

        );

      case "day":
        const dayNums = [];
        for (let i = 1; i <= 31; i++) {
          dayNums.push(i);
        }
        return (
            <>
              {dayNums.map(dayNum => (
                <option
                  value={`${dayNum}`}
                  key={`${dayNum}`}
                  onClick={()=>setDayTracker(dayNum)}>{dayNum}
                </option>
              ))}
            </>
          );

      case "year":
        const today = new Date();
        let yyyy = today.getFullYear();
        const years = [];
        for (let i = 0; i <= 100; i++) {
          const priorYear = yyyy - i;
          years.push(priorYear);
        }
        return (
          <>
            {years.map(year => (
              <option
                value={year}
                key={year}
                onClick={()=>setYearTracker(year)}>{year}
              </option>
            ))}
          </>
        );
    }
  }

  return (
    <div className="signup_form_container">
        <div className="signup_left">
          <form onSubmit={handleSubmit}>
            <div className="signup_text">
              <div className="signup_header">
                <h2>Sign up for Kelp</h2>
              </div>
              <div className="signup_slogan">
                <h5>Connect with great local businesses</h5>
              </div>
              <div className="signup_disclaimer">
                <p>By logging in, you agree to Kelp's
                  <a href="https://terms.yelp.com/tos/en_us/20200101_en_us/"> Terms of Service </a>
                  and
                  <a href="https://terms.yelp.com/privacy/en_us/20200101_en_us/"> Privacy Policy</a>.
                </p>

              </div>
            </div>

            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="signup_name">
              <input
                className="firstname"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="lastname"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              className="signup_input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="signup_input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="signup_input"
              type="text"
              placeholder="ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            <div className="birthday_container">
              <div className="header_container">
                <h5>Birthday</h5>
                <p>Optional</p>
              </div>
              <div className="date_container">
                <select name="month" id="month-select" onChange={(e)=> setMonth(e.target.value)}>
                  <option value="">Month</option>
                  {renderDate("month")}
                </select>
                <select className="day" id="day-select" onChange={(e)=> setDayTracker(e.target.value)}>
                  <option value="">Day</option>
                  {renderDate("day")}

                </select>
                <select className="year" id="year-select" onChange={(e)=> setYearTracker(e.target.value)}>
                  <option value="">Year</option>
                  {renderDate("year")}
                </select>
              </div>
            </div>
            <button className="signup_button" type="submit">Sign Up</button>
            <div className="signup_redirect">
              <p>Already on Yelp?
                <a href="/login"> Log in</a>
              </p>
            </div>
          </form>
        </div>
      <div className="signup_right">
        <div className="image_container">  </div>
      </div>
    </div>

  );
}

export default SignupFormPage;
