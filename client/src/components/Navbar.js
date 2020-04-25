import React from 'react';
import {NavLink} from 'react-router-dom';

export default () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink exact activeClassName="alert-primary" className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact activeClassName="alert-primary" className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact activeClassName="alert-primary" className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact activeClassName="alert-primary" className="nav-link" to="/post">Posts</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
}

