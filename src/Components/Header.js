import React ,{useState, useEffect}from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css';

function Header() {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname === "/dashboard"){
            setActiveTab("Home");
        }else if(location.pathname === "/dashboard/add"){
            setActiveTab("Add Contact");
        }
    },[location]);
    return (
        <div className="header">
            <div className="header-right">
                <Link to="/dashboard">
                    <p className={`${activeTab === "Home" ? "active":""}`} onClick={()=>setActiveTab("Home")}>
                        Dashboard
                    </p>
                </Link>
                <Link to="/dashboard/add">
                    <p className={`${activeTab === "Add Contact" ? "active":""}`} onClick={()=>setActiveTab("Add Contact")}>
                        Add Information Here
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Header;
