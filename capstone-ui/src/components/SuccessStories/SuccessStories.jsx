import React from "react";
import "./SuccessStories.css";
import girl1 from "../../images/girl1.PNG";

export default function SuccesStories() {
  return (
    <div className="successStories">
      <h1
        className="mainHeading"
        style={{ color: "white", marginBottom: "28px" }}
      >
        Our blessed <br /> mentees said{" "}
      </h1>
      <div className="mainCont">
        <div className="firstCont">
          <div className="txtCont">
            <h1>"Incredible Experience"</h1>
            <p>
              {" "}
              Meet and Match helped me find the best mentor and friend who could
              assist me during job applications and interviews. The mentors and
              mentees on this app are so friendly and helpful. I can't wait to
              invite my friend to use this app!{" "}
            </p>
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <img
              src={girl1}
              style={{
                color: "white",
                height: "65px",
                width: "65px",
                marginTop: "4px",
                borderRadius: "50%",
              }}
            />
            <div className="manteeCont">
              <h6>user1 </h6>
            </div>
          </div>
        </div>

        <div className="firstCont">
          <div className="txtCont">
            <h1>"Best Mentor Ever"</h1>
            <p>
              {" "}
              My favorite part about this app is the matching algorithm and how
              accurate it can be. I also like that I can see other users on a
              map and how far they are from me. It gives me an idea of who to
              reach out!{" "}
            </p>
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <img
              src={girl1}
              style={{
                color: "white",
                height: "65px",
                width: "65px",
                marginTop: "4px",
                borderRadius: "50%",
              }}
            />
            <div className="manteeCont">
              <h6>user2 </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
