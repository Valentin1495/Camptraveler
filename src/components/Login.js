import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import React from "react";
import auth from "../firebase"
import firebase from "firebase";

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Unichat!</h2>
                <div 
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}    
                >
                    <GoogleOutlined /> Sign in with Google
                </div>
                <br /> <br />
                <div 
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}    
                >
                    <FacebookOutlined /> Sign in with Facebook
                </div>
            </div>
        </div>
    )
}

export default Login;