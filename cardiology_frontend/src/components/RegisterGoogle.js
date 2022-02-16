import React from "react";
import { GoogleLogin } from "react-google-login";

const RegisterGoogle = () => {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <GoogleLogin
      clientId="627745415175-d1977cs12k0vl4iqqv5g496peda58i32.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )

}

export default RegisterGoogle;


