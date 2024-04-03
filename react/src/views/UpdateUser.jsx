import React, { useEffect, useState } from 'react'
import { Phone } from 'react-bootstrap-icons';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import Swal from 'sweetalert2';
import Preloader from '../components/Preloader';

export default function UpdateUser() {

  
  const navigate = useNavigate();
  const {id} = useParams();
  const [errors, setErrors] = useState(null)
  const[loading,setLoading] = useState(true)
  const[user,setUser] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation:''
  })
  const [isEdited, setIsEdited] = useState(false);
  const [initialUserData, setInitialUserData] = useState({});

  
  useEffect(() => {
    // setLoading(true)
    axiosClient.get(`/users/${id}`)
    .then(({data})=>{
      setUser(data)
      setInitialUserData(data) 
      setLoading(false)
    })
    
  }, [])

  useEffect(() => {
    const hasChanges = !isEqual(initialUserData, user);
    setIsEdited(hasChanges);
  }, [initialUserData, user]);
  
  // Function to check object equality
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };


  const subForm = (ev)=>{
    ev.preventDefault();


    if (!isEdited) {
      // No edits, handle accordingly (e.g., show a message)
      Swal.fire({
        title: 'No Changes!',
        text: 'Please Make Changes Before Submitting !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }
    setLoading(true)

    axiosClient.put(`/users/${user.id}`,user)
    .then(()=>{
      setLoading(false)
      Swal.fire({
        title: 'Updated!',
        text: 'Record Edited Successfully !',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{return navigate('/users')})
      
    })
    .catch(err =>{
      const response = err.response
      if (response && response.status === 422) {
          setErrors(response.data.errors)
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
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input value={user.phone} onChange={ev => setUser({...user, phone: ev.target.value})} placeholder="Phone Number"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <button className="btn" onClick={subForm} >{loading ? 'Saving':'Save'}</button>
          </form>
        )}
    </>
  )
}
