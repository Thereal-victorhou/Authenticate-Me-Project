import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation'
import HomePage from "./components/HomePage";
import RestaurantPage from "./components/RestaurantPage";
import AddReviewForm from './components/ReviewPage';
import EditReviewForm from "./components/EditPage";
import AddRestaurantPage from "./components/AddRestaurant";
import EditRestaurantPage from './components/EditRestaurant'
import SearchResultPage from './components/SearchResultPage'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LoadScript } from "@react-google-maps/api";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return isLoaded && (
    <>
      <LoadScript
        googleMapsApiKey={'AIzaSyAV_Av8kiFRXTUMoummUh8tOAbg4zJZ2tY'}
        libraries={['places']}
      >

        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <HomePage user={user}/>
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/restaurants/:id">
              <RestaurantPage user={user}/>
            </Route>
            <Route path='/add/restaurant'>
              <AddRestaurantPage user={user}/>
            </Route>
            <Route path='/edit/restaurant/:id'>
              <EditRestaurantPage user={user}/>
            </Route>
            <Route path="/review/restaurant/:id">
              <AddReviewForm user={user}/>
            </Route>
            <Route path="/review/rating/:selectedRating/restaurant/:id">
              <AddReviewForm user={user}/>
            </Route>

            <Route path="/edit/review/:id">
              <EditReviewForm user={user}/>
            </Route>
            <Route path="/search">
              <SearchResultPage />
            </Route>
            {/* <Route>
              <h2>Page Not Found</h2>
            </Route> */}
          </Switch>
        )}
      </LoadScript>
    </>
  );
}

export default App;
