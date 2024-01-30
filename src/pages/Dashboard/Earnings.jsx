import Header from "./header";
import './Earning.css'; 
import EarningsTable from "./EarningsTable";

export default function Earnings() {
    return (
      <>
        <Header />
        <div className="earnings-container">
          <h2 className="earnings-title">My Earnings</h2>
          <div className="earnings-boxes">
            <div className="earnings-box">
              <h3>Available funds</h3>
              <div className="earnings-info">
              <span className="earnings-label">Balance available for use</span>
                <span className="earnings-amount">US$880.00</span>
              </div>
              <div className="earnings-sub-info">
                <span>Withdrawn to date:</span>
                <h5>US$332.00</h5>
              </div>
              <button className="earnings-button">Withdraw balance</button>
              <h6>Manage payout methods</h6>
            </div>
            <div className="earnings-box">
              <h3>Future payments</h3>
              <div className="earnings-info">
              <span className="earnings-label">Payments being cleared</span>
                <span className="earnings-amount">US$0.00</span>
               
              </div>
              <div className="earnings-sub-info">
                <span>Payments for active orders:</span>
                <span className="earnings-amount">Coming soon</span>
              </div>
            </div>
            <div className="earnings-box">
              <h3>Earnings & expenses</h3>
              <div className="earnings-info">
              <span className="earnings-label">Earnings to date</span>
                <span className="earnings-amount">US$1,212.00</span>
              </div>
              <div className="earnings-sub-info">
                <span>Expenses to date:</span>
                <span className="earnings-amount">US$0.00</span>
              </div>
            </div>
          </div>
        </div>

        <EarningsTable/>
      </>
    )
}
