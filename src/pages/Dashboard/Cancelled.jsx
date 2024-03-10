import styles from './Cancelled.module.css'; 

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

export default function Cancelled() {

  return (
    <>
    <h2 className="lesson-title">Cancelled Requests</h2>
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student</th>
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
              <td className={styles.buyercell}>
              <img src="/public/default-user.jpg" alt={order.student} className={styles.buyerAvatar} />
                <span className={styles.buyername}>{order.student}</span>
              </td>
              <td>{order.subject}</td>
              <td>{order.level}</td>
              <td>{order.dueOn}</td>
              <td>{order.total}</td>
              <td>{order.lesson}</td>
              <td>
                <span className={styles.cancelledbadge}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}