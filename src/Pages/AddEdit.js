import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './AddEdit.css';
import firebaseApp from '../firebase';
import { toast } from 'react-toastify';


const initialstate = {
    name: "",
    email: "",
    contact: "",
}

function AddEdit() {
    const [state, setState] = useState(initialstate);
    const [data, setData] = useState({});
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        firebaseApp.child("contacts").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        })
        return () => {
            setData({});
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] })
        } else {
            setState({ ...initialstate })
        }

        return () => {
            setState({ ...initialstate })
        }
    }, [id, data]);
    const { name, email, contact } = state;
    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Please provide value in every fiels");
        } else {
            if (!id) {
                firebaseApp.child("contacts").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Added Successfully");
                    }
                });
            } else {
                firebaseApp.child(`contacts/${id}`).set(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Updated Successfully");
                    }
                });
            }
            setTimeout(() => {
                history.push("/dashboard");
            }, 500);
        }
    }
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handlerSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter Your Name Here" value={name || ""} onChange={handlerInputChange} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter Your Email Here" value={email || ""} onChange={handlerInputChange} />

                <label htmlFor="contact">Conatct</label>
                <input type="number" id="contact" name="contact" placeholder="Enter Your Contact No Here" value={contact || ""} onChange={handlerInputChange} />

                <input type="submit" value={id ? "Update Data" : "Save Data"} />
            </form>
        </div>
    )
}

export default AddEdit
