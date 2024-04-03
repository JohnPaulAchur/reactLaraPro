import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2'
import Preloader from "../components/Preloader";
import MyMessagesDataTable from "../components/MyMessagesDataTable";

export default function MyMessages(){

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Change this as needed
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  
  let counterStart = (currentPage - 1) * perPage + 1; // Calculate the starting counter value for the current page

  useEffect(() => {
    getMessages();
  }, [currentPage]); // Fetch messages when currentPage changes

  const getMessages = () => {
    setLoading(true);
    axiosClient.get(`/my-messages?page=${currentPage}&per_page=${perPage}`)
      .then(({ data }) => {
        setLoading(false);
        setMessages(data.data);
        setTotalPages(Math.ceil(data.meta.total/data.meta.per_page));
      })
      .catch(() => {
        setLoading(false);
      }); 
  }
  

  const delMessage = (messageId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    .then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/messages/${messageId}`)
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Message Deleted Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            getMessages(); // Refresh message list after deletion
          })
        }
    });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',alignItems:'center' }}>
        <h1>My Messages</h1>
        <Link className="btn-add" to='/send-message'>Send New</Link>
      </div>

      <div className="card fadeInDown animated">
        <MyMessagesDataTable
          messages={messages}
          loading={loading}
          counterStart={counterStart}
          delMessage={delMessage}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
