import PropTypes from "prop-types";

export default function LoginModel({
  showLoginModal,
  handleCloseLoginModal,
  handleShowSignUpModal,
  handleLogin,
  signUpEmail,
  signUpPassword,
  setSignUpEmail,
  setSignUpPassword,
}) {
  return (
    <>
      <div
        className="modal"
        style={{
          display: showLoginModal ? "block" : "none",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
        onClick={handleCloseLoginModal}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "#fefefe",
            margin: "15% auto",
            padding: "20px",
            border: "1px solid #888",
            width: "80%",
            overflowY: "auto",
            maxHeight: "90vh",
            zIndex: 1001,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Log in to start learning</h2>
            <button
              type="button"
              className="close"
              onClick={handleCloseLoginModal}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-auth-content">
              <h4>Log in to start learning</h4>
              <div className="modal-auth-footer" style={{ border: "none" }}>
                <span>Don&quot;t have a account?</span>
                <button
                  className="modal-auth-footer-login-btn"
                  onClick={handleShowSignUpModal}
                >
                  Sign up
                </button>
              </div>
            </div>

            <button className="google-signup-btn">
              <img
                src="/google-icon.png"
                alt="Google Icon"
                className="google-icon"
              />
              Continue with Google
            </button>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label id="emailLabel">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label id="passwordLabel">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="google-signup-btn"
                style={{
                  background: "linear-gradient(to top, #3661a0, #57cbf5)",
                  marginTop: "10px",
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

LoginModel.propTypes = {
  showLoginModal: PropTypes.bool.isRequired,
  handleCloseLoginModal: PropTypes.func.isRequired,
  handleShowSignUpModal: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  signUpEmail: PropTypes.string,
  signUpPassword: PropTypes.string,
  setSignUpEmail: PropTypes.func.isRequired,
  setSignUpPassword: PropTypes.func.isRequired,
};
