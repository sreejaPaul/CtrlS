import React, { useState, useEffect } from 'react';
import firebaseApp from '../firebase';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Home() {
    const [data, setData] = useState({});
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [upDis, setUpDis] = useState("block");
    const [downDis, setDownDis] = useState("none");

    useEffect(() => {
        setTimeout(()=>{
            firebaseApp.child("contacts").on("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    setData({ ...snapshot.val() });
                } else {
                    setData({});
                }
            })
            setLoading(false);
        },8000);
        return () => {
            setData({});
        }
    }, []);

    useEffect(() => {
        const res = Object.values(data);
        const ids = Object.keys(data);
        const resInfo = res.map((data,index)=>{
            data.id = ids[index];
            return data;
        })
        console.log(resInfo)
        setInfo(resInfo)
    }, [data])

    const OnDelete = (id) => {
        if (window.confirm("Are you sure that you want to delete the contact ?")) {
            firebaseApp.child(`contacts/${id}`).remove((err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Contact deleted successfully.")
                }
            })
        }
    }

    const upArrowClick = ()=>{
        setUpDis("none");
        setDownDis("block");

        info.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    }
    const downArrowClick = ()=>{
        setDownDis("none");
        setUpDis("block");
        info.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        console.log(info)
    }
    
    return (
        <div style={{ marginTop: "150px" }}>
            {(!loading)?
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No</th>
                        <th style={{ textAlign: "center" }}>
                            <div style={{display:"flex"}}>
                                <div style={{marginRight:"5px"}}>
                                    Name
                                </div>
                                <div style={{display: upDis}} onClick={upArrowClick}>
                                    <ArrowUpwardIcon/>
                                </div>
                                <div  style={{display: downDis}} onClick={downArrowClick}>
                                    <ArrowDownwardIcon/>
                                </div>
                            </div></th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Conatact</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((singleInfo, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{singleInfo.name}</td>
                                <td>{singleInfo.email}</td>
                                <td>{singleInfo.contact}</td>
                                <td>
                                    <Link to={`/dashboard/update/${singleInfo.id}`}>
                                        <button className="butn butn-edit">Edit</button>
                                    </Link>
                                    <button className="butn butn-delete" onClick={() => OnDelete(singleInfo.id)}>Delete</button>
                                    <Link to={`/dashboard/view/${singleInfo.id}`}>
                                        <button className="butn butn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            :
                <div className="skel">
                    <Skeleton count={1} inline width={500} height={250} />
                </div>
            }
        </div>
    )
}

export default Home;
