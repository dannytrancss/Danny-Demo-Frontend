import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'antd/dist/antd.css';

import AgentForm from "./components/agent-form";
import AgentTable from "./components/agent-table";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/agents" className="navbar-brand">
          Agents
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/agents"} className="nav-link">
              Agent List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Agent
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/agents"]} component={AgentTable} />
          <Route exact path="/add" component={AgentForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
