import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Components/Signup';
import { AuthProvider } from './Context/AuthContext';
import { Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import ForgotPassword from './Components/ForegtPassword';
import UpdateProfile from './Components/UpdateProfile';
import Frontpage from './Frontpage';
import More from './Pages/More';
import AddEdit from './Pages/AddEdit';
import Home from './Pages/Home';
import Header from './Components/Header';
import View from './Pages/View';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="app">
      <ToastContainer position="top-center" />
      <Route path="/" exact>
        <Frontpage />
      </Route>
      
          <AuthProvider>
            <Route path="/dashboard" exact>
              <Dashboard />
              <Header />
              <Home />
            </Route>
            <Route path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/dashboard/add" exact>
            <Dashboard />
              <Header />
              <AddEdit />
            </Route>
            <Route path="/dashboard/update/:id" exact>
            <Dashboard />
              <Header />
              <AddEdit />
            </Route>
            <Route path="/dashboard/view/:id" exact>
            <Dashboard />
              <Header />
              <View />
            </Route>
            <Route path="/dashboard/more" exact>
              <Dashboard />
              <Header />
              <More />
            </Route>
          </AuthProvider>
        


    </div>
  );
}

export default App;
