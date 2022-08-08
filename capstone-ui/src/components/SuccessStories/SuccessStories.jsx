import React from "react";
import "./SuccessStories.css";
import { Button, Container, Row, Col } from "react-bootstrap";
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
              Lorem ipo fuga nobis tenetur accusantium, dolorum perferendis eum
              ab exercitationem. Vitae ex consequatur repellat tempora fuga,
              aliquid dolorem nostrum laboriosam perspiciatis magni delectus
              sint, obcaecati numquam sunt!{" "}
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
              <h6>Mission </h6>
              <p> Lorem Ipsum</p>
            </div>
          </div>
        </div>

        <div className="firstCont">
          <div className="txtCont">
            <h1>"Best Mentor Ever"</h1>
            <p>
              {" "}
              Lorem ipo fuga nobis tenetur accusantium, dolorum perferendis eum
              ab exercitationem. Vitae ex consequatur repellat tempora fuga,
              aliquid dolorem nostrum laboriosam perspiciatis magni delectus
              sint, obcaecati numquam sunt!{" "}
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
              <h6>Mission </h6>
              <p> Lorem Ipsum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
