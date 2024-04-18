import logo from './Artboard 1.svg';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

//import components, alphabetical
import Cart from './components/Cart';
import CourseSearch from './components/CourseSearch';
import Home from './components/Home';
import Login from './components/Login';
import PreviousCourses from './components/PreviousCourses';
import RegistrationStatus from './components/RegistrationStatus';
import Schedule from './components/Schedule';
import NavPopup from './components/NavPopup';
import AllPreviousCourses from './components/AllPreviousCourses';

//css for this page only
const css=`
  .app-container{
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    display: grid;
    grid-template-rows: 100px 1fr;
  }
  .header{
    background-color: #D73F09;
    padding: 10px;
  }

  .nav-header{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .app-body{
    display: grid;
    grid-template-rows: 50px 1fr;
  }

  .logo{
    height: 100%;
    width: auto;
  }

  .burger-bar-icon{
    cursor: pointer;
    color: #262626;
    margin: 7px 5px 0px 10px;
    font-size: 25px;
    height: 25px;
    width: 25px;
  }
`

function App() {
  //navigate across pages, used as a function navigate("/page")
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [openNav, setOpenNav] = useState(false);
  
  // fake cart to get passed around in Cart and CourseSearch, gets modified and used 
  const [cart, setCart] = useState([
    {id: 0, cartId:0, course: "CS 372", courseName:"Intro to Networks", units: 4, day: "TBA", room: "Online", status: "Registered"},
    {id: 1, cartId:0, course: "CS 461", courseName:"Senior Software Engineering Project", units: 3, day: "TBA", room: "Online", status: "Registered"},
    {id: 2, cartId:0, course: "CS 450", courseName:"Intro to Computer Graphics", units: 4, day: "TBA", room: "Online", status: "Waitlisted"},
    {id: 3, cartId:0, course: "WR 327", courseName: "Technical Writing", units: 3, day: "TBA", room: "Online", status: "In Cart"},

    {id: 4, cartId:1, course: "CS 372", courseName:"Intro to Networks", units: 4, day: "TBA", room: "Online", status: "In Cart"},
    {id: 5, cartId:1, course: "CS 461", courseName:"Senior Software Engineering Project", units: 3, day: "TBA", room: "Online", status: "Registered"},
    {id: 6, cartId:1, course: "CS 450", courseName:"Intro to Computer Graphics", units: 4, day: "TBA", room: "Online", status: "Waitlisted"},
  ]);

  const [navList, setNavList] = useState([
    {title: "Home", route:"/"},
    {title: "Add/Drop Courses", route:"/AddClasses"},
    {title: "Course Search", route:"/SearchForCourses"},
    {title: "View Schedule", route:"/ViewSchedule"},
    {title: "View Previous Courses", route:"/ViewPreviousCourses"},
  ])

  const signOut = () =>{
    setIsLoggedIn(false);
  }

  //main program is in App
  //app-body is where the components display
  return (
    <div className="app-container">
      <style>{css}</style>
      <div className='header flex-row' style={{justifyContent:"space-between", alignItems:"center"}}>
            <img src={logo} alt="Oregon State" className='logo'onClick={(e)=>navigate("/")} style={{cursor: "pointer"}}/>
          {isLoggedIn &&
            <div>
              <button onClick={(e)=>{signOut()}}>Sign Out</button>
            </div>
          }
      </div>
        {isLoggedIn &&
          <div className='app-body'>
            <div className='nav-header'>
                <FontAwesomeIcon className="burger-bar-icon" onClick={(e)=>setOpenNav(true)} icon={faBars} />
                <h1 style={{textDecoration:"underline", padding: 0, margin: 0}}>{pageTitle}</h1>
            </div>
            {openNav && <NavPopup setOpenNav={setOpenNav} navList={navList}></NavPopup>}
            {/*//if the user is logged in these pages will route correctly*/}
            <Routes>
              <Route path="/" element={<Home setPageTitle={setPageTitle} setOpenNav={setOpenNav}/>}/>
              <Route path="/AddClasses" element={<Cart setPageTitle={setPageTitle} cart={cart} setCart={setCart}/>}/>
              <Route path="/SearchForCourses" element={<CourseSearch setPageTitle={setPageTitle} cart={cart} setCart={setCart} isTermSelected={false}/>}/>
              <Route path="/ViewPreviousCourses" element={<PreviousCourses setPageTitle={setPageTitle}/>}/>
              <Route path="/ViewAllPreviousCourses" element={<AllPreviousCourses setPageTitle={setPageTitle}/>}/>
              <Route path="/ViewRegistrationStatus" element={<RegistrationStatus setPageTitle={setPageTitle} cart={cart}/>}/>
              <Route path="/ViewSchedule" element={<Schedule setPageTitle={setPageTitle} openNav={openNav}/>}/>
            </Routes>
          </div>
        }
        {!isLoggedIn &&
          //when user logs out on any page, they log back in they can end up on same page
          //if we can we'll make a timeout logout. for the timeout they go to the same page
          //if they manually exit we send them home next time

          //there are better ways to do this, but for now this will do
          //we are passing the state (isLoggedIn)'s setter into the login page to set the value
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/AddClasses" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/SearchForCourses" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/ViewPreviousCourses" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/ViewRegistrationStatus" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/ViewSchedule" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          </Routes>
        }
    </div>
  );
}

export default App;
