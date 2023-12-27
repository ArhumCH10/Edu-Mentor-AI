import NavBar from "../../ui/NavBar";
import { useEffect } from 'react';

function LoginPage() {
  const styles = {
    
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#4283BB',
      minHeight: '100vh',
      alignItems: 'center',
      
    },
    leftSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'relative',
    },
    greenBox: {
      position: 'absolute',
      marginLeft: '8rem',
      background: 'linear-gradient(to bottom, #00ff0a, #009e66)',
      height: '100%',
      width: '60%',
    },
    leftImage: {
      width: '25em',
      zIndex: 3,
      marginLeft: '8rem',
      transform: 'scale(1.3)',
      position: 'relative',
    },
    rightSection: {
      flex: 1,
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '60%',
      margin: 'auto',
    },
    paperContainer: {
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      paddingRight: '3.5em',
      paddingLeft: '3.5em',
      paddingTop: '2em',
      zIndex: 100,
    },
    heading: {
      fontWeight: 'bold',
      fontSize: '2.5em',
      marginLeft:'6rem',
      marginBottom: '2rem',
    },
    formContent: {
      width: '100%',
    },
    formInput: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      border: 'none',
      outline: 'none',
      width: '100%',
      marginBottom: '1em',
      padding: '0.5em',
    },
    submitBtn: {
      marginTop: '1em',
      margin: 'auto',
      backgroundColor: '#4DFF00',
      color: 'black',
      fontWeight: 'bold',
      borderRadius: '1em',
      padding: '0.5em 1em',
      cursor: 'pointer',
      textAlign: 'center', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', 
      transition: 'background-color 0.3s',
    },
    backgroundImage: {
      position: 'absolute',
      top: 100,
      marginLeft: '-4rem',
      marginTop: '-3rem',
      width :'58%',
      opacity: 0.2,
      zIndex: 1,
    },
  };


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
    };
  }, []);
  return (
    <>
    <NavBar currentImageIndex={0} />
    <div style={styles.mainContainer}>
      <div style={styles.leftSection}>
        <div style={{marginLeft:'10rem',marginTop:'2rem',display:'flex',flexDirection:'row'}}>

        </div>
        <img src="d1.png" alt="design1" style={{height:'20%',width:'20%', margin:'auto',zIndex:3,marginTop:'1rem'}} />
        <div style={styles.greenBox}></div>
        <img src="student.png" alt="Image 1" style={styles.leftImage} />
      </div>
      <div style={styles.rightSection}>
        <img src="d3.png" alt="design3" style={{height:'20%',width:'20%',marginTop:'-5rem'}}/>
        <img src="d4.png" alt="design3" style={{height:'20%',width:'20%',marginTop:'-2rem',marginLeft:'24rem'}}/>
        <div style={styles.formContainer}>
          <div style={styles.paperContainer}>
            <h1 style={styles.heading}>Login</h1>
            <form style={styles.formContent}>
              <input type="text" style={styles.formInput} placeholder="Email" required />
              <input type="password" style={styles.formInput} placeholder="Password" required />
              <button type="submit" style={styles.submitBtn}>Login</button>
            </form>
          </div>
        </div>
        <img className="background-image" src="logo.png" alt="Background Image" style={styles.backgroundImage} />
        <img src="d2.png" alt="design3" style={{height:'20%',width:'20%',marginTop:'2rem',marginLeft:'-2rem'}}/>
        <img src="d5.png" alt="design3" style={{height:'20%',width:'25%',marginTop:'3rem',marginLeft:'15rem'}}/>

      </div>
    </div>
    </>
  );
}


export default LoginPage;
