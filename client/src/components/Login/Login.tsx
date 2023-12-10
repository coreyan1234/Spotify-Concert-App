import React from "react";

// a code verifier is a high-entropy cryptographic random string with a length between 43 and 128 characters
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


// Transforms (hashes) the code verifier using the SHA256 algorithm. 
// This is the value that will be sent within the user authorization request.
const sha256 = async (plain: string | undefined) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}
// Next, we will implement a function base64encode that returns the base64 representation of the digest 
// we just calculated with the sha256 function:
const base64encode = (input: any) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


// requesting user authorization
const clientId = '10d5ee494b4d47ada0ff6de74a7174fa';
const redirectUri = 'http://localhost:3000/';
const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// // generated in the previous step
// window.localStorage.setItem('code_verifier', codeVerifier);

// const params = {
//   response_type: 'code',
//   client_id: clientId,
//   scope,
//   code_challenge_method: 'S256',
//   code_challenge: codeChallenge,
//   redirect_uri: redirectUri,
// }

// // redirect to the Spotify authorization server login page by updating the window.location
// authUrl.search = new URLSearchParams(params).toString();
// window.location.href = authUrl.toString();

// // parse the URL to retrieve the code parameter
// // The code will be necessary to request the access token in the next step
// const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get('code');


// After the user accepts the authorization request of the previous step, 
// we can exchange the authorization code for an access token
const getToken = async (code: string) => {

  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');

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
    }),
  }

  const api_token_url = "https://accounts.spotify.com/api/token";
  const body = await fetch(api_token_url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
}







const handleLogin = async () => {
  // Create the code verifier (this is just a randomly generated string):
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem('code_verifier', codeVerifier);

  // Generate the code challenge using the code verifier:
  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);

  // Request authorization from the user and retrieve the authorization code:
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }
  authUrl.search = new URLSearchParams(params).toString();
  // redirect to the Spotify authorization server login page by updating the window.location
  console.log("redirecting to spotify authorization window");
  window.location.href = authUrl.toString();


  // ----------------------------------------------------------------------------------------------------------------------------------------------------
  // Starting from here, I'm not sure if this logic should all be handled in the same function
  // because now we are handling stuff after the user has already authenticated
  

  // parse the URL to retrieve the code parameter
  // The code will be necessary to request the access token in the next step
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');

  // we can exchange the authorization code for an access token:
  if (code) {
    console.log("code!")
    getToken(code);
  }
  else {
    console.log("no code");
  }
}









const Login = () => {
  return (
    <div>
      <h1>Login placeholder</h1>
      {/* <p>codeVerifier: { codeVerifier }</p> */}
      <button onClick={handleLogin}>login to spotify</button>
    </div>
  )
}



export default Login;