import React, { useState, useEffect } from 'react';
import firebaseApp from '../firebase';
import { useParams, Link } from 'react-router-dom';
import './View.css';

function View() {
    const [contact, setContact] = useState({});

    const { id } = useParams();

    useEffect(() => {
        firebaseApp.child(`contacts/${id}`).get().then(snapshot => {
            if (snapshot.exists()) {
                setContact({ ...snapshot.val() });
            } else {
                setContact({});
            }
        })
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>User contact detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Name: </strong>
                    <span>{contact.name}</span>
                    <br />
                    <br />

                    <strong>Email: </strong>
                    <span>{contact.email}</span>
                    <br />
                    <br />

                    <strong>Contact No: </strong>
                    <span>{contact.contact}</span>
                    <br />
                    <br />
                    <Link to="/dashboard">
                        <button className="back">Go Back To Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View
