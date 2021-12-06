import React from 'react';
import './Frontpage.css';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
import Button from '@material-ui/core/Button';

function Frontpage() {
    return (
        <div className="frontpage">
            <div className="all">
                <div className="insideSlider">{"Ctrl+S "}</div>
                <div className="insideSlider">
                    <span className="insideSliderSpan">{" - A Solution To Store Data "}</span>
                </div>
            </div>
            <div className="type">
                <Typist>
                    <Typist.Delay ms={3500} />
                    <p></p>
                    Want To Save
                    <span style={{color:"#6FABCA"}}> Your Time?</span>
                    <Typist.Backspace count={11} delay={1500} />
                    <span style={{color:"#6FABCA"}}> Your Data?</span>
                    <Typist.Delay ms={1000} />
                    <p></p>
                    Store All Your Data
                    <span className="color onespace"> {" Securely "} </span>
                    <Typist.Delay ms={1000} />
                    <p></p>
                    <span className="color space"> {" Fast "}</span>
                    <Typist.Delay ms={1000} />
                    <p></p>
                    <span className="color space">{" Easily "} </span>
                    <Typist.Delay ms={2000} />
                    <div className="frontbtn">
                        <Link to="/login">
                            <Button variant="outlined" color="primary">
                                Login Here To Enjoy
                            </Button>
                        </Link>
                    </div>
                </Typist>
            </div>
        </div>

    )
}

export default Frontpage;
