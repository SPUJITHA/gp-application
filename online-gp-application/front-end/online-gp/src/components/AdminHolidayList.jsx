import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HolidayList.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from '../components/DeleteConfirmationModel.jsx';
const AdminHolidayList = () => {

    const navigate = useNavigate();
    const location = useLocation();
   
    const [unavailabilities, setUnavailabilities] = useState([]);


    const [currentPage, setCurrentPage] = useState(0); // Start with the first page
    const [pageSize] = useState(10); // Page size
    const isLastPage = unavailabilities.length < pageSize;
    const { user } = useContext(UserContext);
    const userEmail = user?.emailId;
    console.log("User Email", userEmail);
    
    useEffect(() => {
      
            fetchUnavailabilities( currentPage);
       
    }, [ currentPage, pageSize]); // This will trigger when doctorEmailId, currentPage, or pageSize changes
    
    const fetchUnavailabilities = async ( page) => {
        try {
          const response = await axios.get(`http://localhost:8083/api/doctor_unavailability/all-holiday-list?page=${page}&size=${pageSize}`);

            setUnavailabilities(response.data.content || []); // Ensure you access the correct property and fallback to an empty array

        } catch (error) {
            console.error('Failed to fetch unavailabilities:', error);
        }
    };
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUnavailabilityId, setDeletingUnavailabilityId] = useState(null);

  const handleDeleteClick = (availabilityId) => {
    setIsDeleteModalOpen(true);
    setDeletingUnavailabilityId(availabilityId);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8083/api/doctor_unavailability/delete-unavailability/${deletingUnavailabilityId}`);
      if (response.status === 200 || response.status === 204) {  // Ensure correct status code for successful delete
        alert('Deleted unavailability successfully!');
        setUnavailabilities(currentUnavailabilities => 
          currentUnavailabilities.filter(unavailability => unavailability.unavailabilityId !== deletingUnavailabilityId)
        );
        setIsDeleteModalOpen(false); // Close the modal
      } 
    } catch (error) {
      console.error('Error deleting entry', error);
      alert('Failed to delete entry.');
    }
  };
  
    const goToNextPage = () => {
        setCurrentPage(currentPage => currentPage + 1);
      };
    
      const goToPrevPage = () => {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      };
     
      const handleEdit = (unavailability) => {
        navigate('/edit-admin-availability', {
          state: {
            id: unavailability.unavailabilityId,
            startDate: unavailability.unavailableStartDate,
            endDate: unavailability.unavailableEndDate,
            reason: unavailability.unavailableReason,
            
          }
        });
      };
      const navigateToSupportRequests = () =>
      {
        navigate('/admin-technical-request' , { state: { emailId: userEmail } });
      }
                
   
  
  return (
    <div className="holiday-list-container">
        
        <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={logoImage} alt="Docmed Logo" className="logo-img" />
          </Link>
          <div className="welcome-message">
            <p>Welcome Admin!</p>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/admin-dashboard')}>Home</button>
            <button onClick={() => navigate('/admin-appointment-list')}>Appointments</button>
            <button  onClick={() => navigate('/admin-patient-details')}>
                  Patient Details
            </button> 
            <button  onClick={navigateToSupportRequests}>
                Support Requests
            </button> 
           
            <Link to="/doctor-profile">Doctor Profile</Link>
            <Link to="/user-login">Logout</Link>
          </div>
        </nav>
      </header>
      <div className="holiday-list-section">
      <div className="main-content" >
    <h1>Holiday List</h1>
            <table>
            <thead>
    <tr>
        <th className="unavailability-id">Unavailability ID</th>
        <th className="start-date">Unavailability Start Date</th>
        <th className="end-date">Unavailability End Date</th>
        <th className="reason">Unavailability Reason</th>
        <th className="actions">Edit</th>
        <th className="actions">Delete</th>
    </tr>
</thead>
<tbody>
                    {unavailabilities.map((unavailability) => (
                        <tr key={unavailability.unavailabilityId}>
                            <td>{unavailability.unavailabilityId}</td>
                            <td>{new Date(unavailability.unavailableStartDate).toLocaleDateString()}</td>
                            <td>{new Date(unavailability.unavailableEndDate).toLocaleDateString()}</td>
                            <td>{unavailability.unavailableReason}</td>
                            <td>
                                <button className="update-btn" onClick={() => handleEdit(unavailability)}>Edit</button>
                            </td>
                            <td>
                      <button onClick={() => handleDeleteClick(unavailability.unavailabilityId)} className="delete-btn">Delete</button>
                      <div>
                      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
                      </div>

                      </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
  disabled={currentPage === 0}
  onClick={goToPrevPage}
  className={`pagination-btn ${currentPage === 0 ? 'disabled' : ''}`}
>
  Previous
</button>

        <button onClick={goToNextPage} className="pagination-btn" disabled={isLastPage}>Next</button>
    
    
        </div>
        </div>
        </div>
    );
};

export default AdminHolidayList;
