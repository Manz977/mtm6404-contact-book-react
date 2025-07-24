import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import db from './utils/db';
import { collection, getDocs } from 'firebase/firestore';
import AddSvg from './assets/add.svg';
import './App.css';

function App() {
  const [contactBook, setContactbook] = useState([]);
  const [allContacts, setAllContacts] = useState([]);

  const fetchcontactBook = async () => {
    const docSnapshot = await getDocs(collection(db, 'contactbook'));
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    const sortedData = data.sort((a, b) => {
      const nameA = a.lastName?.toLowerCase() || '';
      const nameB = b.lastName?.toLowerCase() || '';
      return nameA.localeCompare(nameB);
    });
    setContactbook(sortedData);
    setAllContacts(sortedData);
  };

  useEffect(() => {
    fetchcontactBook();
  }, []);

  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    const filtered = allContacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(value.toLowerCase())
    );
    setContactbook(filtered);
  };

  return (
    <>
      <h1 className="headOne">Contact Book</h1>

      <section className="contact">
        <div className="main-contact">
          <div className="top-bar">
            <h2>Contact</h2>
            <Link to="/add">
              <img src={AddSvg} alt="Add icon" className="add-svg" />
            </Link>
          </div>
          <div className="search">
            <div className="grid"></div>
            <div id="poda">
              <div className="glow"></div>
              <div className="darkBorderBg"></div>
              <div className="darkBorderBg"></div>
              <div className="darkBorderBg"></div>
              <div className="white"></div>
              <div className="border"></div>

              <div id="main">
                <input
                  placeholder="search...."
                  type="text"
                  name="text"
                  className="input"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <div id="input-mask"></div>
                <div id="pink-mask"></div>
                <div className="filterBorder"></div>
                <div id="filter-icon">
                  <svg
                    preserveAspectRatio="none"
                    height="27"
                    width="27"
                    viewBox="4.8 4.56 14.832 15.408"
                    fill="none"
                  >
                    <path
                      d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                      stroke="#d6d6e6"
                      strokewdth="1"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div id="search-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    viewBox="0 0 24 24"
                    strokewdth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    height="24"
                    fill="none"
                    className="feather feather-search"
                  >
                    <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                    <line
                      stroke="url(#searchl)"
                      y2="16.65"
                      y1="22"
                      x2="16.65"
                      x1="22"
                    ></line>
                    <defs>
                      <linearGradient gradientTransform="rotate(50)" id="search">
                        <stop stopColor="#f8e7f8" offset="0%"></stop>
                        <stop stopColor="#b6a9b7" offset="50%"></stop>
                      </linearGradient>
                      <linearGradient id="searchl">
                        <stop stopColor="#b6a9b7" offset="0%"></stop>
                        <stop stopColor="#837484" offset="50%"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-list">
            <ul>
              {contactBook.map((contact) => (
                <li key={contact.id}>
                  <Link to={`/contact/${contact.id}`}>
                    {`${contact.firstName} ${contact.lastName}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
