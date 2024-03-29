import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, useParams, NavLink, useNavigate, useLocation} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </Router>

);

{/* <Home /> */}

function Home() {

  return(
    <div>
      <h1>Home</h1>
    </div>
  );

}

function Learn() {

  return(
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className='btn btn-success' to="/learn/courses">Courses</Link> 
      |
      <Link className='btn btn-primary' to="/learn/bundles">Bundles</Link>
      <Outlet />
    </div>
  );

}

function Courses() {

  const courseList = ["React", "Angular", "Vue", "NodeJS"];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];

  return(
    <div>
      <h1>Courses list</h1>
      <h4>Courses card</h4>

      <p>More Test</p>

      <NavLink 
        style={({isActive}) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow"
          }
        }}
        to={`/learn/courses/${randomCourseName}`}
      >
          {randomCourseName}
      </NavLink>

      <NavLink className="btn btn-light" to={`/learn/courses/test`}>
        tests
      </NavLink>

      <Outlet />
    </div>
  );

}

function Bundles() {

  return(
    <div>
      <h1>Bundles list</h1>
      <h4>Bundles card</h4>
    </div>
  );

}

function CourseId() {

  const navigate = useNavigate();
  const {courseid} = useParams();

  return(
    <div>
      <h1>URL Params is : {courseid}</h1>
      <button onClick={() => {
        navigate("/dashboard", {state: courseid});
      }} className='btn btn-warning'>
        Price
      </button>
      <Link to="/dashboard" state={"Laravel"}>Test Link</Link>
    </div>
  );

}

function Dashboard() {

  const location = useLocation();

  return(
    <div>
      <h1>Info that i got here {location.state}</h1>
    </div>
  );

}

reportWebVitals();
