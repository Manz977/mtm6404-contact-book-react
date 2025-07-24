import { useState } from "react";
import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export const Add = () => {
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const collect = collection(db, "contactbook");
    try {
      const contact = await addDoc(collect, {
        firstName: editData.firstName,
        lastName: editData.lastName,
        phoneNumber: editData.phoneNumber,
        email: editData.email
      });
      setEditData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      });

      navigate('/');
    } catch (error) {
      alert("There was a big problemo adding a contact, please contact support with the error number 2.");
      console.error("erro adding contact line 48", error);
    }
  };

  return (
    <>
      <h1>Add Contact</h1>
      <section className="form">
        <div className="form-container">
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" value={editData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" value={editData.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" name="phoneNumber" value={editData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" value={editData.email} onChange={handleChange} />
            </div>
            <button type="submit" className="form-submit-btn">Add Contact</button>
          </form>
        </div>
      </section>
    </>
  );
};
