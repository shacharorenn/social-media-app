import React,{useState} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Post from './components/Post';
import Navbar from './components/Navbar';

function App() {
  const [token,setToken] = useState("");
  console.log(token);
  //test
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact path="/register" render={() => <Register token={token}/>} />
        <Route exact path="/login" render={(props) => <Login {...props} tokenCb={setToken} token={token}/>} />
        <Route exact component={Post} path="/post" />
      </Switch>
    </div>
  );
}

export default App;
