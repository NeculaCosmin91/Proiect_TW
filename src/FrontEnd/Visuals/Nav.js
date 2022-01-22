import { useState, Fragment } from "react";
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

function Nav() {
  const navStyleState = useState({ color: "white" });
  const navigate = useNavigate();

  return (
    <Fragment>
      
      <AppBar style={{ position: "relative" }}>
      <div>Welcome to my travel website</div>
        <Toolbar>
          <Typography variant="h2">
            <Button
              style={navStyleState[0]}
              onClick={function onClick() {
                navigate("/");
              }}
            >
              Homepage
            </Button>
          </Typography>

          <ul className="nav-links">
            <Link to={"/forecast"} className="nav-link">
              <li>Forecast</li>
            </Link>
          </ul>
          <ul className="nav-links">
            <Link to={"/countries"} className="nav-link">
              <li>Countries</li>
            </Link>
          </ul>
          <ul className="nav-links">
            <Link to={"/addcountries"} className="nav-link">
              <li>Add Countries</li>
            </Link>
          </ul>
          <ul className="nav-links">
            <Link to={"/deletecountries"} className="nav-link">
              <li>Delete Countries</li>
            </Link>
          </ul>
          <ul className="nav-links">
            <Link to={"/updatecountries"} className="nav-link">
              <li>Update Countries</li>
            </Link>
          </ul>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Nav;
