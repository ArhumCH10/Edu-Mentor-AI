
import Header from "./header";

export default function Dashboard() {
    
    return (
      <>
      <Header/>
      <div className="container-fluid graph-msg-row" >
  <div className="row ">
    <div className="col-7 borderBox Graph" >
      Graph ploting
    </div>
    <div className="col borderBox Messages" >
      Messages
    </div>
  </div>
  <div className="row ">
    <div className="col borderBox Earnings" >
      Total Earnings
    </div>
    <div className="col borderBox overview">
      Overview
    </div>
    <div className="col borderBox Upcoming-classes-today ">
      Upcoming classes today
    </div>
  </div>
</div>
      </>
    )
  }