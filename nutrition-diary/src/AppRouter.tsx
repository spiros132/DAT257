import React, {startTransition, useState} from "react";
// import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import CreateAccountPage from "@/pages/CreateAccountPage";
import MenuPage from "@/pages/MenuPage";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';




const AppRouter: React.FC = () => {
  return (
    <Router>
      <BrowserRouter>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/create-account">
          <CreateAccountPage />
        </Route>
        <Route path="/menu">
          <MenuPage />
        </Route>
      </BrowserRouter>
    </Router>
  );
};

{/** return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/create-account" component={CreateAccountPage} />
        <Route path="/menu" component={MenuPage} />
        
        </Switch>
        </Router>
      ) */}


export default AppRouter;
