import './App.css';
import { useState } from 'react';
import NoteState from './context/notes/NotesState';
import CompanyState from './context/company/CompanyState';
import { Route, BrowserRouter as Router, Switch, } from "react-router-dom";
import Manage from './components/Manage';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentInfo from './components/StudentInfo';
import Notes from './components/Notes';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import LoginStaff from './components/LoginStaff';
import SignUpStaff from './components/SignupStaff';



function App() {
  
  const [member, setMember] = useState('');
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ 
      msg:message, 
      type:type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  console.log(member, "membervalue")
  return (
    <>
    
      <NoteState>
        <CompanyState>
      
        <Router>
          <Navbar member={member}/>
          <Alert alert={alert}/>
          <div className="container">
       <Switch>
            <Route exact path="/">
                <Manage  setMember={setMember}/>
             </Route>
             <Route exact path="/">
         <Home showAlert={showAlert} />
       </Route>
       <Route exact path="/loginstudent">
         <Login showAlert={showAlert}/>
       </Route>
       <Route exact path="/signupstudent">
         <Signup showAlert={showAlert}/>
       </Route>
             <Route exact path="/note">
              <Notes showAlert={showAlert}/>
             </Route>
              <Route exact path="/loginstaff">
                <LoginStaff showAlert={showAlert}/>
              </Route>
              <Route exact path="/signupstaff">
                <SignUpStaff showAlert={showAlert}/>
              </Route>
              <Route exact path="/aboutStudent">
                <StudentInfo showAlert={showAlert}/>
              </Route>
             
             </Switch>
             </div>
             </Router>

  
 
      
        </CompanyState>
      </NoteState>
    </>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';
// import {
//   BrowserRouter as Router, Switch, Route
// } from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// import NoteState from './context/notes/NotesState';
// import CompanyState from './context/company/CompanyState';
// import Alert from './components/Alert';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import { useState } from 'react';
// import Manage from './components/Manage';

// function App() {
//   const [alert, setAlert] = useState(null);
//   const showAlert = (message, type) => {
//     setAlert({ 
//       msg:message, 
//       type:type });
//     setTimeout(() => {
//       setAlert(null);
//     }, 3000);
//   }

//   return (
//     <>
//       <NoteState>
//         <CompanyState>
//         <Router>
//     {/* <Manage/> */}

//           <Navbar />
//           <Alert alert={alert}/>
//           <div className="container">
//             <Switch>
//               <Route exact path="/">
//                 <Home showAlert={showAlert} />
//               </Route>
//               <Route exact path="/about">
//                 <About />
//               </Route>
             
              
//               <Route exact path="/login">
//                 <Login showAlert={showAlert}/>
//               </Route>
//               <Route exact path="/signup">
//                 <Signup showAlert={showAlert}/>
//               </Route>
//             </Switch>
//           </div>
//         </Router>
//         </CompanyState>
//       </NoteState>
//     </>
//   );
// }

// export default App;
