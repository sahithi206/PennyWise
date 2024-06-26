import React from "react";
import Index from "../components/Header/Index"; // Adjust the path accordingly
import SignupSignincomp from  "../components/SignupSignin/SignupSignincomp";
function Signup() {
  return (
    <div>
      <Index />
      
      <div className="wrapper">
      <SignupSignincomp />
      </div>
    </div>
  );
}
export default Signup;