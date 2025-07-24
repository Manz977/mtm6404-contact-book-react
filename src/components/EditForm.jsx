import { useState, useEffect } from "react";

export const EditForm = ({ contact, onUpdate }) => {
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    if (contact) {
      setEditData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        phoneNumber: contact.phoneNumber || '',
        email: contact.email || ''
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editData);
  };

  return (
    <>
      <h1>Edit Contact</h1>
      <section className="form">
        <div className="form-container">
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={editData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="form-submit-btn">
              Edit Contact
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
