import React,{useState, useEffect} from 'react';
import firebaseApp from '../firebase';
import {Link} from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

function Home() {
    const [data,setData] = useState({});

    useEffect(()=>{
        firebaseApp.child("contacts").on("value", (snapshot)=>{
            if(snapshot.val() !== null){
                setData({...snapshot.val()});
            }else{
                setData({});
            }
        })
        return()=>{
            setData({});
        }
    },[]);
    const OnDelete = (id)=>{
        if(window.confirm("Are you sure that you want to delete the contact ?")){
            firebaseApp.child(`contacts/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.success("Contact deleted successfully.")
                }
            })
        }
    }
    return (
        <div style={{marginTop: "150px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>No</th>
                        <th style={{textAlign:"center"}}>Name</th>
                        <th style={{textAlign:"center"}}>Email</th>
                        <th style={{textAlign:"center"}}>Conatact</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <th scope="row">{index+1}</th>
                                <td>{data[id].name}</td>
                                <td>{data[id].email}</td>
                                <td>{data[id].contact}</td>
                                <td>
                                    <Link to={`/dashboard/update/${id}`}>
                                        <button className="butn butn-edit">Edit</button>
                                    </Link>
                                    <button className="butn butn-delete" onClick={()=> OnDelete(id)}>Delete</button>
                                    <Link to={`/dashboard/view/${id}`}>
                                        <button className="butn butn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
