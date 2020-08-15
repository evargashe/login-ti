import React, {Component} from "react";
import loginImg from "../../csunsa.png";
import Unsa from "../../unsalogo.png";

import 'firebase/auth';
const emailRegex = RegExp(
  /^[a-z]+@[a-z]+(?:\.[a-z]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    e.target.reset();
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

 
   render() {
     const {formErrors} = this.state;
     return (
       <div className="base-container" ref={this.props.containerRef}>
         <div className="header"></div>
         <div className="content">
           <div className="image">
             <img src={loginImg} />
           </div>
           <div className="form">
            <h1 className="title">Login</h1>
             <div className="form-group">
               <label htmlFor="email">Username</label>
               <input
               className={formErrors.email.length > 0 ? "error" : null} 
               type="email" 
               name="email" 
               placeholder="email" 
               noValidate
               onChange={this.handleChange}/>
               {formErrors.email.length > 0 &&(
                 <span className="errorMessage">{formErrors.email}</span>
               )}
             </div>
             <div className="form-group">
               <label htmlFor="password">Password</label>
               <input 
                className={formErrors.password.length > 0 ? "error" : null}
                type="password" 
                name="password" 
                placeholder="password" 
                noValidate
                onChange={this.handleChange}/>
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
             </div>
             <div className="footer">
              <button type="button" className="btn">
                Login
              </button>
            </div>
           </div>
         </div>
         
       </div>
     );
   }
 }