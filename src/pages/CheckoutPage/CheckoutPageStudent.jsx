import {  Button, Divider } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import { Backend_URI } from '../../Config/Constant';


function CheckoutPageStudent() {

  const location = useLocation();
  const [teacherName, setTeacherName] = useState('');
  const [formattedStartDate, setFormattedStartDate] = useState('');
  //const [formattedEndDate, setFormattedEndDate] = useState('');
  const [hourlyPrice, setHourlyPrice] = useState(0);
  const [tutorData, setTutorData] = useState({});

  const transactionFee = 0.30;

  useEffect(() => {
    const eventData = location.state?.eventData;
    const tutorData = location.state?.eventData.tutorData;

    const start = eventData?.event.start;
   // const end = eventData?.event.Dateend;

   setFormattedStartDate(start ? new Date(start).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : ''); 
    //setFormattedEndDate(end ? new Date(end).toLocaleString() : '');
   
    if (tutorData) {
      setTutorData(tutorData);
      setTeacherName(`${tutorData.firstName} ${tutorData.lastName}`);
      setHourlyPrice(tutorData.hourlyPriceUSD);

    }
  }, [location]);

  const makePayment = async (paymentAmount) => {
    const stripe = await loadStripe(
      "pk_test_51Obp44KAlnAzxnFUz8GK3HrpVPY0RkdVZQlKOn7tYAuf5t6LmioU2tdpYEy44MfglP2c4ih8yUiOmOdwJIgLfD7K00s65yhj9D"
    );
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const body = {
      paymentAmount: paymentAmount, // Include the payment amount in the request body
      metadata:  {
        StudentUsername: storedUser.username,
        teacherEmail: tutorData.email,
        trialLessonDate: formattedStartDate, 
      },
    };
    
    console.log('metadata::',body);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("http://localhost:8080/student/payment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      console.log(response); // Add this line to inspect the response

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.session.id,
      });
      console.log(result); // Add this line to inspect the response

    } catch (error) {
      console.error("Error making payment:", error);
      // Handle errors as needed
    }
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0' // Grey background color
    }}>
      <div style={{
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // White background color for divs
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Optional: Box shadow for a bit depth
      }}>
        {/* Left Div */}
        <div style={{ flex: 1, border: "2px solid silver", padding: "15px", borderRadius: "1em" }}>
          <h5>Secure Checkout</h5>
          <Divider orientation="vertical" flexItem />

          {/* <p style={{color:"grey",marginTop:"5px"}}>Payment Method</p> */}

          <p style={{ color: "grey", marginTop: "15px", marginBottom: "-10px" }}>Its safe to pay on EduMentor. All transactions are protected by SSL encryption </p>

          <svg style={{ marginBottom: "-385px", }} viewBox="0 -11 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="69" height="47" rx="5.5" fill="white" stroke="#D9D9D9"></rect>
            <path fillRule="evenodd" clipRule="evenodd" d="M37.6109 16.2838L34.055 17.047V14.164L37.6109 13.415V16.2838ZM45.0057 17.8808C43.6173 17.8808 42.7248 18.5308 42.229 18.9831L42.0448 18.1069H38.9281V34.5849L42.4698 33.8359L42.484 29.8365C42.994 30.2039 43.7448 30.7268 44.9915 30.7268C47.5273 30.7268 49.8365 28.6918 49.8365 24.2119C49.8223 20.1136 47.4848 17.8808 45.0057 17.8808ZM44.1556 27.6177C43.3198 27.6177 42.8239 27.321 42.4839 26.9535L42.4698 21.7105C42.8381 21.3007 43.3481 21.0181 44.1556 21.0181C45.4448 21.0181 46.3373 22.4595 46.3373 24.3108C46.3373 26.2045 45.4589 27.6177 44.1556 27.6177ZM61 24.3532C61 20.7354 59.2433 17.8808 55.8858 17.8808C52.5142 17.8808 50.4742 20.7354 50.4742 24.325C50.4742 28.5787 52.8825 30.7268 56.3392 30.7268C58.025 30.7268 59.3 30.3452 60.2633 29.8082V26.9818C59.3 27.4623 58.195 27.7591 56.7925 27.7591C55.4183 27.7591 54.2 27.2786 54.0442 25.611H60.9717C60.9717 25.5332 60.9768 25.3565 60.9826 25.1528L60.9826 25.1526V25.1525V25.1524V25.1523V25.1523C60.9906 24.8753 61 24.5486 61 24.3532ZM54.0016 23.0107C54.0016 21.4138 54.9791 20.7496 55.8716 20.7496C56.7358 20.7496 57.6566 21.4138 57.6566 23.0107H54.0016ZM34.0548 18.121H37.6107V30.4866H34.0548V18.121ZM30.0176 18.121L30.2443 19.1668C31.0801 17.6405 32.7376 17.9514 33.1909 18.121V21.3714C32.7518 21.2159 31.3351 21.0181 30.4993 22.1063V30.4866H26.9576V18.121H30.0176ZM23.1607 15.0543L19.704 15.7892L19.6899 27.109C19.6899 29.2005 21.2624 30.7409 23.359 30.7409C24.5207 30.7409 25.3707 30.529 25.8382 30.2746V27.4058C25.3849 27.5895 23.1465 28.2396 23.1465 26.148V21.1311H25.8382V18.121H23.1465L23.1607 15.0543ZM14.7884 20.9475C14.0375 20.9475 13.5842 21.1594 13.5842 21.7106C13.5842 22.3124 14.3644 22.5771 15.3323 22.9055C16.9102 23.4409 18.9871 24.1455 18.9959 26.7557C18.9959 29.2854 16.97 30.741 14.0234 30.741C12.805 30.741 11.4733 30.5007 10.1558 29.9355V26.572C11.3458 27.2221 12.8475 27.7026 14.0234 27.7026C14.8167 27.7026 15.3834 27.4906 15.3834 26.8405C15.3834 26.174 14.5376 25.8693 13.5166 25.5015C11.9616 24.9413 10 24.2346 10 21.8802C10 19.3788 11.9125 17.8808 14.7884 17.8808C15.9642 17.8808 17.1259 18.0645 18.3017 18.5309V21.8519C17.225 21.2725 15.865 20.9475 14.7884 20.9475Z" fill="#6461FC"></path>
          </svg>
          <div>
            <input type="checkbox" id="checkbox1" name="checkbox1" />
            <label htmlFor="checkbox1" style={{marginLeft:'5px'}}> I want a <span style={{ color: "white", background: "#00F018", padding: "2px", borderRadius: "2px" }}>Free Lesson</span> or <span style={{ color: "white", background: "#00F018", padding: "2px", borderRadius: "2px" }}>Refund</span>, If the tutor does not meet my needs</label>
          </div>

          <Button style={{ margin: "25px 0" }} variant="contained" onClick={() => makePayment(transactionFee + hourlyPrice)}>Continue</Button>
          <Divider orientation="vertical" flexItem />
          <div style={{ marginTop: "10px" }}>
            <h5>Learn with 100% satisfaction guarantee</h5>
            <p style={{ fontSize: "10px" }}>If your lesson does not take place, or you are not satisfied with the tutor, we will provide you with a free replacement to another tutor of your own choice or offer you a full refund</p>

          </div>

        </div>
        {/* Right Div */}
        <div style={{ flex: 1, border: "2px solid silver", padding: "15px", margin: "0 40px", borderRadius: "1em" }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "20px" }}>
          <img src={!tutorData.profilePhoto ? `${Backend_URI}/${tutorData.profilePhoto}` : 'UserDpNotFound.jpg'} alt="userProfile" style={{  borderRadius: '10% 1%' }} height={50} width={50} onError={(e) => {
                                    e.target.src = `UserDpNotFound.jpg`;
                                    e.target.style.border = '1px solid #ccc';
                                }} />
            <h5 style={{ marginLeft: '10px' }}>{teacherName}</h5>

          </div>
          <Divider orientation="vertical" flexItem style={{ marginBottom: "10px" }} />

          <h5>Date and Time</h5>
          <p>{formattedStartDate} </p>
          <Divider orientation="vertical" flexItem style={{ marginBottom: "10px" }} />
          {/* Two Columns with 4 Rows */}
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h5>Service Details</h5>
              <p>1 Hour Lesson</p>
              <p>Transaction Fee</p>
              <p>Lesson Cancellation</p>
            </div>
            <div style={{ flex: 1 }}>
              <h5>Price Per Hour</h5>
              <p>${hourlyPrice}</p>
              <p>${transactionFee}</p>
              <p>Free</p>
            </div>
          </div>
          <Divider orientation="vertical" flexItem style={{ marginBottom: "10px" }} />
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h5>Total</h5>

            </div>
            <div style={{ flex: 1 }}>
              <h5>${transactionFee + hourlyPrice}</h5>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPageStudent