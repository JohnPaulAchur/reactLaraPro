import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";

export default function Login(){

    const navigate = useNavigate();

    const emailRef = useRef();
    const passRef = useRef();

    const {setUser, setToken} = useStateContext()
    const [valErrors,setValErrors] = useState(null)
    const [loading,setLoading] = useState(false)

    // const renderFieldError = () => {
    //     return valErrors && <p className="text-danger error-message">{valErrors.errors.password}</p>;
    //   };

    const subLoginForm = (e)=>{
        e.preventDefault();

        setLoading(true)
        
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }

        // console.log(payload)
        axiosClient.post('/login', payload)
      .then(({data}) => {
        if(data.user.utype=="ADM"){
            setUser(data.user)
            setToken(data.token);
            Swal.fire({
                title: 'Success !',
                text: `Welcome ${data.user.name} !`,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(()=>{return navigate('/dashboard')})
        }
        if(data.user.utype=="USR" && data.user.status=="Active"){
            setUser(data.user)
            setToken(data.token);
            Swal.fire({
                title: 'Login Successful !',
                text: `Welcome ${data.user.name}.`,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(()=>{return navigate('/my-messages')})
        }
        if(data.user.utype=="USR" && data.user.status=="Pending"){
            Swal.fire({
                title: 'Oops!',
                text: `Sorry ! Your account is pending activation.\n You can't login to your account yet.`,
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then(() => {
                passRef.current.value = ''; // Clear password input
            });
        }

        setLoading(false)

      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
            // setValErrors(response.data.message)
            Swal.fire({
                title: 'Input Error !',
                text: response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        setLoading(false)
      });

    }
    return (
        <div className="login-signup-form fadeInDown animated">
            <div className="form">
                <form onSubmit={subLoginForm}>
                    <h1 className="title">Login To Your Account.</h1>

                    {valErrors &&
                        <div className="alert">
                          <p>{valErrors}</p>
                        </div>
                    }

                    <input ref={emailRef} type="email" placeholder="Email" />
                    {/* {renderFieldError('errors.email')} */}

                    <input ref={passRef} type="password" placeholder="Password" />
                    {/* {renderFieldError('password')} */}

                    <button className="btn-block btn" disabled={loading ? true :false}>{loading ? 'Loading ...' : 'Login'}</button>
                    <p className="message">
                        Not Registered? <Link to='/signup'>Create An Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}