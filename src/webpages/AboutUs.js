import NavBar from "../components/Navbar";
import sean from "../images/sean.jpg";
import weehng from "../images/weehng.jpg";
import  "../styles/AboutUs.css";

function AboutUs() {
  return (
    <>
      
        <section className="header">
          <NavBar />
        </section>

        <h1>ABOUT US</h1>
        {/* <!-------about us----------> */}

        <div className="container">
          <div className="title">
            <div className ="description">
              Team Invesfe came about when the two of us decided to take part in
              Orbital, which is a NUS School of Computing’s 1st year summer
              self-directed, independent work course.
            </div>
          </div>
        </div>

        <div className="content">
          <div className="card" id="one">
            <div className="img_box">
              <img src={weehng} alt="" />
            </div>
            <h3>Chua Wee Hng</h3>
            <h3>Co-Developer</h3>
            <div className="description">
            <p>Year 1 NUS Business Analytics</p>
            </div>
          </div>

          <div className="card" id="two">
            <div className="img_box">
              <img src={sean} alt="" />
            </div>
            <h3>Sean Ang</h3>
            <h3>Co-Developer</h3>
            <div className="description">
            <p>Year 1 NUS Information System </p>
            </div>
          </div>
        </div>
      
    </>
  );
}

export default AboutUs;
