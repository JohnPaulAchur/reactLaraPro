import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CheckSquareFill, EyeFill, PencilSquare, Trash, XSquareFill } from 'react-bootstrap-icons';
import Preloader from './Preloader';
import Swal from 'sweetalert2';
import CustomPagination from './CustomPagination';

const UserDataTable = ({
  users,
  loading,
  counterStart,
  delUser,
  handleActivateUser,
  handleDeactUser,
  handlePageChange,
  currentPage,
  totalPages,
  handleFilterChange,
  filter
}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.phone.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const columns = [
    {
      name: 'SN',
      selector: (row, index) => counterStart + index,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Created',
      selector: row => row.created_at,
      sortable: true
    },
    {
        name: 'Status',
        cell: row => (
          <small className={`badge ${row.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
            {row.status}
          </small>
        ),
        ignoreRowClick: true,
        allowOverflow: true
    },
    {
      name: 'Actions',
      cell: row => (
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          <button className="btn-deleter" title='View User Details' onClick={() => handleViewUserDetails(row)} style={{ background: 'transparent' }}>
            <EyeFill style={{color:"blue"}} className="text-info" />
          </button>
          <button className="btn-deleter"  style={{ background: 'transparent' }}>
            {row.status === "Pending" ? (
                <CheckSquareFill title='Activate This User' onClick={() => handleActivateUser(row.id)} className="text-success" />
            ) : (
                <XSquareFill title='Deactivate This User' onClick={() => handleDeactUser(row.id)} className="text-danger" />
            )}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
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
        delUser(userId);
      }
    });
  };
  let proImg = "dummy.jpg"

  return (
    <>
    <div className='container'>
      <div className="filter-section" style={{ marginTop: '20px',width: "100%" }}>
        <div>
            <label htmlFor="filter">Filter : </label>
            <select id="filter" value={filter} onChange={handleFilterChange} style={{ marginRight: '10px', padding: '5px' }}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            </select>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        progressPending={loading}
        progressComponent={<Preloader />}
        pagination
        paginationPerPage={10} // Number of rows per page
        paginationRowsPerPageOptions={[10, 20, 30]} // Rows per page options
        paginationComponent={() => (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
        highlightOnHover
        noHeader
        defaultSortField="created_at"
        defaultSortAsc={false}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
      />
      
    </div>
    {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>User Details</h2>

            <ul className="cards">
                <li className="card">
                <div className="card__img">
                    <div className="img__cover">
                    <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" alt="" />
                    </div>
                    <div className="img__profile">
                    <img src={proImg} alt="" />
                    </div>
                </div>
                <div className="[ card__text ] [ flow ]">
                    <h2>
                    <a href="#"> {selectedUser.name}</a>
                    </h2>
                    <div className="meta">
                    <p className="meta__info">
                        <span className="visually-hidden">Account Created : {selectedUser.created_at}</span>
                        <span className={`meta__creators ${selectedUser.status === "Pending" ? "badge-danger" : "badge-success"}`} style={{marginLeft:"4px",fontSize:".9em"}}>
                            {selectedUser.status}
                        </span>

                    </p>
                    </div>
                    <p>
                        <span className="visuallyhidden">Email : {selectedUser.email}</span> 
                    </p>
                    <p>
                        <span className="visuallyhidden">Phone : {selectedUser.phone}</span> 
                    </p>
                </div>
                </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDataTable;
