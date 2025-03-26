import React, { useState , useEffect } from 'react'
import './css/SignUp.css'
import './css/responsive/SignUp.css'
import { apiService } from "../services/apiService.js";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "./Loading.jsx";
import logo from '/diammers.png';


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [statusFlag, setStatusFlag] = useState(false);
  const [status, setStatus] = useState("");
  const [statusColour, setStatusColour] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jsonata = {
        "Name": name,
        "Email": email,
        "Password": password        
      }
      try {
        
        const response = await apiService.post('/scouts/add', jsonata, {
          headers: {
            'Content-Type': "application/json",
          },
        });
        console.log(response);

        if(!response.error){
          setStatus("Scout Added Successfully");
          setStatusColour("green");
        }

      } catch (error) {
        console.error('Error adding scout:', error);
        setStatus("An error occured. Could not add new Scout.");
        setStatusColour("red");
      }finally{
        setLoading(false);
        setStatusFlag(true);
      }

  };

  useEffect(() => {
    // const location = useLocation();
    // setLoginId(localStorage.getItem('_id'));

    const verifyToken = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/'); // Redirect to homepage if no token
            return;
        }
        try {
            // navigate("/");
        } catch (error) {
            localStorage.removeItem('jwtToken'); // Clear invalid token
            localStorage.removeItem("_id");  // Remove _id token
            localStorage.removeItem("name");  // Remove name token
            navigate('/'); // Redirect to homepage
        }
    };

      verifyToken();
  }, []);

  useEffect(() => {
    let timer;
    const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          localStorage.removeItem('jwtToken'); // Clear token
          localStorage.removeItem("_id");  // Remove _id token
          localStorage.removeItem("name");  // Remove name token            window.location.href = '/'; // Redirect to homepage
        }, 5* 60 * 1000); // 5 minutes inactivity
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer(); // Initialize timer

    return () => {
        clearTimeout(timer);
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
      };
  }, []);

  return (
    <div className='container'>
      {loading && <LoadingScreen/>}

      <form onSubmit={handleSubmit}>
        
        <div className="settings_wrapper">
          <img src={logo} alt="Diambars" />
          <h1>Add New Scout</h1>
          <input type="text" placeholder='Enter Name of Scout' onChange={(e)=>{setName(e.target.value)}} required/>
          <input type="email" placeholder='Enter Email of Scout' onChange={(e)=>{setEmail(e.target.value)}} required/>
          <input type="text" placeholder='Enter Password' onChange={(e)=>{setPassword(e.target.value)}} required/>
          <button type='sumbit'>Add Scout</button>
          {true && <div className={`status ${statusColour}`}>{status}</div>}
        </div>
      </form>

    </div>
  )
}

export default SignUp