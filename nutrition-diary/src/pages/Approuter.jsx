import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import EditMealPage from './EditMealPage';
import MainPage from './MainPage';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/edit-meal" component={MealPage} />
      </Switch>
    </Router>
  );
}
