import './Cancelled.css'; 
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const cancelledOrders = [
    {
      student: 'jhroth',
      subject: 'english',
      dueOn: 'Apr 30, 2023',
      level: 'Level 1',
      total: '$30',
      lesson: '50-min',
      status: 'CANCELLED'
    },
    {
      student: 'destinyedokp313',
      subject: 'english',
      level: 'New Student',
      dueOn: 'Apr 14, 2023',
      total: '$180',
      lesson: '50-min',
      status: 'CANCELLED'
    },
    {
        student: 'jhroth',
        subject: 'english',
        level: 'New Student',
        dueOn: 'Apr 30, 2023',
        total: '$30',
        lesson: '25-min',
        status: 'CANCELLED'
      },
      {
        student: 'destinyedokp313',
        subject: 'english',
        dueOn: 'Apr 14, 2023',
        level: 'New Student',
        total: '$180',
        lesson: '50-min',
        status: 'CANCELLED'
      },
  ];

export default function CancellReq() {
  return (
    <>
    <Row type="horizontal">
    <Heading as="head1">Cancelled Requests</Heading>
  </Row>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Mentor</th>
            <th>Subject</th>
            <th>Level</th>
            <th>DUE ON</th>
            <th>TOTAL</th>
            <th>LESSON</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {cancelledOrders.map((order, index) => (
            <tr key={index}>
              <td className="buyercell">
              <img src="/public/default-user.jpg" alt={order.student} className="buyerAvatar" />
                <span className="buyername">{order.student}</span>
              </td>
              <td>{order.subject}</td>
              <td>{order.level}</td>
              <td>{order.dueOn}</td>
              <td>{order.total}</td>
              <td>{order.lesson}</td>
              <td>
                <span className="cancelledbadge">{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}