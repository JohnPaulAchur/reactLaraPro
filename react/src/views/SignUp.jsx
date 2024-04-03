import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Preloader from "../components/Preloader";
import Swal from "sweetalert2";

export default function SignUp(){
        const navigate = useNavigate();

        const nameRef = useRef();
        const emailRef = useRef();
        const telRef = useRef();
        const passRef = useRef();
        const cpassRef = useRef();

        const {setUser, setToken} = useStateContext()
        const [valErrors,setValErrors] = useState({})
        const [loading,setLoading] = useState(false)

        const renderFieldError = (fieldName) => {
            return valErrors[fieldName] && <p className="text-danger error-message">{valErrors[fieldName][0]}</p>;
          };


    const subSignupForm = (e)=>{
        e.preventDefault();
        setLoading(true)
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: telRef.current.value,
            password: passRef.current.value,
            password_confirmation: cpassRef.current.value,
        }
        // console.log(payload)
        axiosClient.post('/signup',payload)
        .then(({data})=>{
            // setToken(data.token)
            setUser(data.user)

            Swal.fire({
                title: 'Hey '+ data.user.name,
                text: 'Your Account Has Been Created Successfully ! \n You will be able to log in once the admin activates your account',
                icon: 'info',
                confirmButtonText: 'Ok'
            }).then(()=>{return navigate('/login')})
        })
        .catch(err =>{
            setLoading(false)
            const response = err.response
            if (response && response.status == 422){
                console.log(response.data.errors)
                setValErrors(response.data.errors)           
                setTimeout(() => {
                    setValErrors({});
                  }, 5000);
            }
        });
    }


    return (
         
        <div className="login-signup-form fadeInDown animated">
            <div className="form">
                <form onSubmit={subSignupForm}>
                    <h1 className="title">User Account Registration</h1>
                    {/* {
                        (valErrors && Object.keys(valErrors).length > 0) && 
                        <div className="alert">
                            {Object.keys(valErrors).map(key=>(
                                <p key={key}>{valErrors[key][0]}</p>
                            ))}
                        </div>
                    } */}
                    <input ref={nameRef} type="text" placeholder="Name" />
                    {renderFieldError('name')}

                    <input ref={emailRef} type="email" placeholder="Email" />
                    {renderFieldError('email')}

                    <input ref={telRef} type="number" placeholder="Tel." />
                    {renderFieldError('phone')}

                    <input ref={passRef} type="password" placeholder="Password" />
                    {renderFieldError('password')}

                    <input ref={cpassRef} type="password" placeholder="Confirm Password" />

                    <button disabled={loading ? true :false} className="btn-block btn">{loading ? 'loading ...' : 'Sign Up'}</button>
                    <p className="message">
                        Already Have An Account? <Link to='/login'>Login Here</Link>
                    </p>
                </form>
            </div>
        </div>
            
    )
}