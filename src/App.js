import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Route, Redirect } from "react-router-dom";
import { ContactForm } from "./components/contacts/ContactForm";
import { ContactProvider } from "./components/contacts/ContactProvider";
import { ContactList } from "./components/contacts/ContactList";
import { Home } from "./components/home/Home";
import { EditContactForm } from "./components/contacts/EditContactForm";
import {EditUserForm} from "./components/user/EditUserForm"
import {EventDrinkProvider} from "./components/eventDrinks/EventDrinkProvider"
import {DrinkingPage} from "./components/drinking/DrinkingPage"
import {DrinkList} from "./components/drinking/DrinkList"
import {ResultsPage} from "./components/drinking/ResultsPage"
import {EventList} from "./components/eventDrinks/EventList"
import { UserProvider} from './components/user/UserProvider'
import {EventDetailsPage} from './components/eventDrinks/EventDetailsPage'



function App() {
  return (
    <>
      <Route
        render={() => {
          // The user id is saved under the key app_user_id in local Storage. Change below if needed!
          if (localStorage.getItem("lu_token")) {
            return (
              <>
                
                <EventDrinkProvider>
                  <Route exact path="/" render={(props) => <Home {...props} />} />
                  <Route exact path="/drinking/:eventId(\d+)" render={(props) => <DrinkingPage {...props} />} />
                  <Route path="/drinking/drinks/:eventId(\d+)" render={(props) => <DrinkList {...props}/>} />
                  <UserProvider>
                    <Route path="/drinking/results/:eventId(\d+)" render={(props) => <ResultsPage {...props}/>} />
                  </UserProvider>
                  <Route exact path="/" render={(props) => <EventList {...props}/>} />
                  <Route exact path="/event/detail/:eventId(\d+)" render={(props) => <EventDetailsPage {...props} />} />
                </EventDrinkProvider>

                <ContactProvider>
                  <Route
                    path="/create-contact"
                    render={(props) => <ContactForm {...props} />}
                  />
                  <Route
                  exact 
                  path="/contacts"
                  render={(props)=> <ContactList {...props} />}
                  />
                  <Route
                  path="/contacts/:contactId(\d+)"
                  render={(props)=> <EditContactForm {...props} />}
                  />
                </ContactProvider>

            
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
    </>
  );
}

export default App;
