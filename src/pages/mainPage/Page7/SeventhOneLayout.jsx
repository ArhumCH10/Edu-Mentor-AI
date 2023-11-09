import SeventhOneCard from "./SeventhOneCard";

const Data = [
  {
    name: "Katididox",
    role: "Student",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quisquam? dmldvd fvf dv fgbgf fb fb",
  },
  {
    name: "Bajwa",
    role: "Teacher",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corporis corrupti. Quas sed totam deserunt.",
  },
  {
    name: "Arhum ",
    role: "Teacher",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corporis corrupti. Quas sed totam deserunt.",
  },
  {
    name: "Bilal Don",
    role: "Teacher",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corporis corrupti. Quas sed totam deserunt.",
  },
  {
    name: "Ghous ",
    role: "Teacher",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corporis corrupti. Quas sed totam deserunt.",
  },
  {
    name: "KinG",
    role: "Teacher",
    text:
     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, corporis corrupti. Quas sed totam deserunt.",
  },
];

function SixthOneLayout() {
  return (
    <div className="SeventhOneLayout">
        <div className="corner seven-top-left"></div>
        <div className="corner seven-top-right"></div>
        <div className="corner seven-bottom-left"></div>
        <div className="corner seven-bottom-right"></div>
        <div className="container text-center mt-5">
            <h1 className="headingPage7">What Clients Say About Us ?</h1>
        </div>
      <div className="container-fluid">
        <div className="row mt-4">
          {Data.map((data, index) => (
            <div key={index} className="col-md-4" style={{zIndex: 2}}>
              <SeventhOneCard
                name={data.name}
                role={data.role}
                text={data.text}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SixthOneLayout;