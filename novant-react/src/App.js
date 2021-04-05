import './App.css';
import ChatBox from './components/rightSideBar/ChatBox';
import Login from './components/Auth/Login/SignIn';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Profile from './Profile';


function App() {
  return <div className='App'>

    <ChatBox></ChatBox>

     <Router>
     <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
  </Router>
  </div>;
}

export default App;
