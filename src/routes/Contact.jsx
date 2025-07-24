import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import db from "../utils/db";
import { EditForm } from "../components/EditForm";

export const Contact = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const { id } = useParams();

  const fetchContactId = async (contactId) => {
    const docRef = doc(db, "contactbook", contactId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setContact({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      });
    } else {
      alert(
        "Contact is not found in our recoreds, plesae call our customre service for help!"
      );
      return null;
    }
  };

  useEffect(() => {
    fetchContactId(id);
  }, [id]);

  const handleUpadte = async (updatedContact) => {
    try {
      const docRef = doc(db, "contactbook", id);
      await updateDoc(docRef, updatedContact);
      navigate("/");
    } catch (error) {
      alert(
        "There was a big problemo updating the contact, please contact support with the error number 3."
      );
      console.error("Error updating student line 46", error);
    }
  };

  const handleContactDelete = async () => {
    const msg = "Are you sure you want to delete?";

    try {
      if (confirm(msg) == true) {
        const docRef = doc(db, "contactbook", id);
        await deleteDoc(docRef);
        setContact({});
        navigate("/");
      } else {
        navigate(0);
      }
    } catch (error) {
      alert("unable to delete contact");
    }
  };

  const DeleteBtn = () => {
    return (
      <button className="delete-btn" onClick={handleContactDelete}>
        Delete Contact
      </button>
    );
  };

  return (
    <>
      <div className="edit-form">
        {contact ? (
          <>
            <EditForm
              className="editForm"
              contact={contact}
              onUpdate={handleUpadte}
            />
            <DeleteBtn />
          </>
        ) : (
          <p>Loading Contact</p>
        )}
      </div>
    </>
  );
};

export default Contact;
