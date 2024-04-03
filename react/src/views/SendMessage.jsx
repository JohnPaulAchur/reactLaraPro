import React, { useState } from 'react';
import { Phone } from 'react-bootstrap-icons';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import Swal from 'sweetalert2';
import Preloader from '../components/Preloader';

export default function SendMessage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axiosClient
      .post(`/send-message`, { message })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'Message Sent Successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          return navigate('/my-messages');
        });
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          setTimeout(() => {
            setErrors(null);
          }, 4000);
        }
      });
  };

  const renderFieldError = () => {
    return errors && <p className="text-danger error-message">{errors.message[0]}</p>;
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <Preloader />
        </div>
      )}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="msg">Write The Admin A Message : </label>
          <br />
          <br />
          <textarea id='msg' value={message} rows={10} onChange={handleChange} placeholder="Enter your message here..." />
          {renderFieldError()}
          <button disabled={loading ? true :false} className="btn" type="submit">
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </>
  );
}








