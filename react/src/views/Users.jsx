import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2'
import Preloader from "../components/Preloader";
import UserDataTable from "../components/UserDataTable";

export default function Users(){

  

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Change this as needed
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter state for pending/active
  let counterStart = (currentPage - 1) * perPage + 1; // Calculate the starting counter value for the current page

  useEffect(() => {
    getUsers(filter);
  }, [currentPage]); 

  // useEffect(() => {
  //   getUsers(filter); // Fetch users initially
  
  //   const interval = setInterval(() => {
  //     getUsers(filter); // Fetch users every 5 seconds
  //   }, 30000);
  
  //   // Clean up function to clear the interval when component unmounts or when currentPage/filter changes
  //   return () => clearInterval(interval);
  // }, [currentPage, filter])

  const getUsers = (filter) => {
    setLoading(true);
    axiosClient.get(`/users/${filter}?page=${currentPage}&per_page=${perPage}&filter=${filter}`)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setTotalPages(Math.ceil(data.meta.total/data.meta.per_page));
      })
      .catch(() => {
        setLoading(false);
      }); 
  }


  // const getFiltUser = () =>{
  //   setLoading(true);
  //   axiosClient.get(`/users/filter?page=${currentPage}&per_page=${perPage}&filter=${filter}`)
  //     .then(({ data }) => {
  //       setLoading(false);
  //       setUsers(data.data);
  //       setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     }); 
  // }

  const delUser = (userId) => {
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
        axiosClient.delete(`/users/${userId}`)
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Record Deleted Successfully !',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            getUsers(); // Refresh user list after deletion
          })
        }
    });
  }

  // const actUser = (userId) => {
  //   axiosClient.put(`/activate-users/${userId}`) // Ensure the route matches the backend route
  //     .then(() => {
  //       Swal.fire({
  //         title: 'Activated!',
  //         text: 'User Activated Successfully !',
  //         icon: 'success',
  //         confirmButtonText: 'Ok'
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error activating user:', error);
  //       // Handle errors if necessary
  //     });
  // }

  const handleActivateUser = (userId) => {
    Swal.fire({
      title: "Are you sure",
      text: "You want activate this user ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !"
    })
    .then((result) => {
      if (result.isConfirmed) {
        axiosClient.put(`/activate-users/${userId}`)
      .then(() => {
        Swal.fire({
          title: 'Activated!',
          text: 'User Activated Successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        getUsers(filter)
      })
      .catch(error => {
        console.error('Error activating user:', error);
      });
      }
    });
  };



  const handleDeactUser = (userId) => {
    Swal.fire({
      title: "Are you sure",
      text: "You want deactivate this user ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !"
    })
    .then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        axiosClient.put(`/deactivate-users/${userId}`)
      .then((res) => {
        Swal.fire({
          title: 'Deactivated!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        getUsers(filter)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error activating user:', error);
      });
      }
    });
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter)
    setCurrentPage(1)
    setLoading(true);
      getUsers(newFilter);
  }

  

  

  return (
    <div>
      
      <div style={{ display:'flex', justifyContent:'space-between',alignItems:'center' }}>
        <h1> Registered Users</h1>
        {/* <Link to='/create-user' className="btn-add">Add New</Link> */}
      </div>

      {/* <div className="card fadeInDown animated">
        <div className="filter-section" style={{ marginBottom: '20px' }}>
          <label htmlFor="filter">Filter : </label>
          <select id="filter" value={filter} onChange={handleFilterChange} style={{ marginRight: '10px', padding: '5px' }}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
          </select>
        </div>
        <table id="example">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
                  <Preloader />
                </td>
              </tr>
            </tbody>
          }
          {!loading && users &&
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{counterStart + index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.created_at}</td>
                  <td style={{ display:'flex', justifyContent:'center',alignItems:'center' }}>
                    <Link to={`/edit-user/${user.id}`} className="m-2"><PencilSquare className="text-primary" /></Link>
                    <button className="btn-deleter" style={{ background:'transparent' }}>
                      <Trash onClick={ev => delUser(user.id)} className="text-danger" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          }
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div> */}
      {/* <UserDataTable /> */}
      <div className="card fadeInDown animated">
        <UserDataTable
          users={users}
          loading={loading}
          counterStart={counterStart}
          delUser={delUser}
          handleActivateUser={handleActivateUser}
          handleDeactUser={handleDeactUser}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          handleFilterChange={handleFilterChange}
          filter={filter}
        />
      </div>
    </div>
  );
}
