import React, { useState } from "react";
import "./index.css";
import Input from "../input/Input";
import Button from "../Button/Index";
import { createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db,provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignupSignincomp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [loginForm,setLoginForm] = useState(false);
  const navigate=useNavigate();
  const signupWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpassword", confirmPassword);

    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      else{ try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User>>>", user);

        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            Name: name,
            Email: email,
            photoURL:user.photoURL ? user.photoURL : "",
            CreatedAt: new Date()
          });
        }
        toast.success("User Created");
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      }
     }
    } else {
       toast.error("All the fields are mandatory!");
       setLoading(false);   
    }
  };
 
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const { displayName, email, photoURL, uid } = user;

        await setDoc(doc(db, "Users", uid), {
          Name: displayName,
          Email: email,
          PhotoURL: photoURL || "",
          CreatedAt: new Date()
        });
      }

      toast.success("User Authenticated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };
   const loginUsingEmail = async (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);

    if (email !== "" && password !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User>>>", user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            Email: email,
            photoURL:user.photoURL ? user.photoURL : "",
            CreatedAt: new Date()
          });
        }
        toast.success("User Logged In");
        setLoading(false);   
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);   
      }
    } else {
      toast.error("All the fields are mandatory!");
      setLoading(false);   
    }
  };
  return (
    <>
    {loginForm ? (
     <div className="signup-wrapper">
     <h3 className="title" >
      Login on <span style={{ color:"var(--primary"}}>PennyWise.</span>
     </h3>
     <form>
      <Input 
        type="email"
         label={"Email"} 
         state={email} 
         setState={setEmail} 
         placeholder={"Arthur4@gmail.com"}
       />
       <Input
        type="password" 
         label={"Password"} 
         state={password} 
         setState={setPassword} 
         placeholder={"Arthur12345"}
       />
          <div className="form-buttons">

           <Button 
            disabled={loading}
            text={loading ? "Loading......" : "Login Using Email"} 
            onClick={loginUsingEmail}
           />
            <Button 
            text={loading ? "Loading......" : "Login Using Google"} 
            onClick={signInWithGoogle}
            green={true} 
            />         
          </div>
          <div className="p-login" onClick={() => setLoginForm(!loginForm)}>
          {loginForm ? "Don't Have an Account? Sign Up Here" : "Already Have an Account? Log In Here"}
        </div>
     </form>
    </div>
    ) : (
      <div className="signup-wrapper">
      <h3 className="title" >
       Sign Up on <span style={{ color:"var(--primary"}}>PennyWise.</span>
      </h3>
      <form>
        <Input 
        type="text"
          label={"Full Name"} 
          state={name} 
          setState={setName} 
          placeholder={"Arthur"}
        />
       <Input 
         type="email"
          label={"Email"} 
          state={email} 
          setState={setEmail} 
          placeholder={"Arthur4@gmail.com"}
        />
        <Input
         type="password" 
          label={"Password"} 
          state={password} 
          setState={setPassword} 
          placeholder={"Arthur12345"}
        />
        <Input 
         type="password"
          label={"Confirm Password"} 
          state={confirmPassword} 
          setState={setConfirmpassword} 
          placeholder={"Arthur12345"}
        />
           <div className="form-buttons">
 
            <Button 
             disabled={loading}
             text={loading ? "Loading......" : "Sign Up Using Email"} 
             onClick={signupWithEmail}
            />
             <Button text={loading ? "Loading......" : "Sign Up Using Google"} green={true} 
             onClick={signInWithGoogle}/>
           </div>
           <div className="p-login" onClick={() => setLoginForm(!loginForm)}>Or Have an Account Already? Click Here</div>
      </form>
     </div>
       )}
    </>
  );
}
