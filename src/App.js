import './App.css';
import { useState } from 'react';
import NoteState from './context/notes/NotesState';
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
      </NoteState>
    </>
  );
}

export default App;