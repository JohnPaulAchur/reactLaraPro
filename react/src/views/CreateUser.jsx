import React, { useEffect, useState } from 'react'
import { Phone } from 'react-bootstrap-icons';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import Swal from 'sweetalert2';
import Preloader from '../components/Preloader';

export default function CreateUser() {

  

  
  const navigate = useNavigate();
  const {id} = useParams();
  const [errors, setErrors] = useState(null)
  const[loading,setLoading] = useState(false)
  const[valErrors,setValErrors] = useState({})
  const[user,setUser] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation:''
  })

  const renderFieldError = (fieldName) => {
    return valErrors[fieldName] && <p className="text-danger error-message">{valErrors[fieldName][0]}</p>;
  };


  

  const subForm = (ev)=>{
    ev.preventDefault();

    setLoading(true)
    axiosClient.post(`/create-users`,user)
    .then(()=>{
      setLoading(false)
      Swal.fire({
        title: 'Success!',
        text: 'User Created Successfully !',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{return navigate('/users')})
      
    })
    .catch(err =>{
      const response = err.response
      if (response && response.status === 422) {
          setLoading(false)
          setErrors(response.data.errors)
          setValErrors(response.data.errors)
          setTimeout(() => {
            setValErrors({})
          }, 4000);
      }
    })
  }


  return (
    <>
      {loading && (
        <div className="text-center">
          <Preloader />
        </div>
           
        )}
        {/* {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        } */}
        {!loading && (
          <form>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            {renderFieldError('name')}

            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            {renderFieldError('email')}

            <input value={user.phone} onChange={ev => setUser({...user, phone: ev.target.value})} placeholder="Phone Number"/>
            {renderFieldError('phone')}

            <input type='password' onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            {renderFieldError('password')}

            <input type='password' onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            {renderFieldError('password_confirmation')}

            <button className="btn" onClick={subForm} >{loading ? 'Saving':'Save'}</button>
          </form>
        )}
    </>
  )
}