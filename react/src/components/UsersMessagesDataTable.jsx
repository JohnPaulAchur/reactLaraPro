import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { EyeFill, Trash } from 'react-bootstrap-icons';
import Preloader from './Preloader';
import Swal from 'sweetalert2';
import CustomPagination from './CustomPagination';

const UsersMessagesDataTable = ({
  messages,
  loading,
  counterStart,
  delMessage,
  handlePageChange,
  currentPage,
  totalPages
}) => {
  let imgLink = 'dummy.jpg'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredMessages = messages.filter(message => {
     return  message.sender_fullname.toLowerCase().includes(searchTerm.toLowerCase())||
            message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.time.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const columns = [
    {
      name: 'SN',
      selector: (row, index) => counterStart + index,
      sortable: true,
      width: '100px'
    },
    {
        name: 'Sender',
        selector: row => row.sender_fullname,
        sortable: true,
    },
    {
      name: 'Message',
      cell: row => (
        <span title={row.message}>
          {row.message.length > 80 ? row.message.substring(0, 80) + '...' : row.message}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Time',
      selector: row => row.time,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Actions',
      cell: row => (
        <button className="btn-deleter" onClick={() => handleViewMsgDet(row)} style={{ background: 'transparent' }}>
          <EyeFill className="text-info" title='Details' style={{color:"blue"}}/>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '100px'
    }
  ];

  const handleViewMsgDet = (row) => {
    setSelectedMessage(row);
    setShowModal(true);
  };

  const handleDeleteMessage = (messageId) => {
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
        delMessage(messageId);
      }
    });
  };

  return (
    <>
    <div className='container'>
      <div className="filter-section" style={{ marginTop: '20px',width: "100%" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredMessages}
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
        defaultSortField="date"
        defaultSortAsc={false}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
      />
    </div>
    {showModal && selectedMessage && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{maxWidth:"80%"}}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>

            <ul className="cards">
                <div className="[ card__text ]">
                    <div className="meta">
                        <p className="meta__info" style={{display:'flex', justifyContent:'flex-start',alignItems:'center'}}>
                            <img src={imgLink} alt="" style={{height:"30px",borderRadius:"100%",margin:"0 4px"}} /> {selectedMessage.sender_fullname}
                        </p>
                    </div>
                    <br />
                    <h5>Message : </h5>
                    <div className="meta">
                        <p className="meta__info">
                            {selectedMessage.message}
                        </p>
                    </div>
                    <br />
                    <h5>Sent : </h5>
                    <div className="meta">
                        <p className="meta__info">
                            {selectedMessage.date} <span style={{color:"blue"}}>{selectedMessage.time}</span>
                        </p>
                    </div>
                </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersMessagesDataTable;
