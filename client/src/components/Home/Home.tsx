import React, { useEffect } from "react";
import NavigationBar from "../NavigationBar";

const clientId = "10d5ee494b4d47ada0ff6de74a7174fa";
const redirectUri = 'http://localhost:3000/';

// After the user accepts the authorization request, 
// we can exchange the authorization code for an access token
const getToken = async (code: string) => {
    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');
    console.log("Home getToken code verifier: ", codeVerifier);

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier!,
        })
    }

    const api_token_url = "https://accounts.spotify.com/api/token";
    const body = await fetch(api_token_url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
}


const Home = () => {
    // Parse the URL to retrieve the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    // Checking if the authorization code exists in the URL
    if (code) {
        console.log("found code in URL")
        getToken(code);
    }
    else {
        console.log("no code in URL");
    }
    return (
        <h1>Home placeholder</h1>
    )
}

export default Home;