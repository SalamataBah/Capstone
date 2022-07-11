import React from "react";
import Navbar from "../../../src/components/Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
    };
    this.requestProfile = this.requestProfile.bind(this);
  }

  componentDidMount() {
    window.addEventListener("message", this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(
        `Login Successfully: ${event.data.profile.localizedFirstName}`,
        { position: "top" }
      );
    }
  };

  updateProfile = (profile) => {
    this.setState({
      isAuthorized: true,
      firstName: _.get(profile, "localizedFirstName", ""),
      lastName: _.get(profile, "localizedLastName", ""),
      profileURL: `https://www.linkedin.com/in/${_.get(
        profile,
        "vanityName",
        ""
      )}`,
      pictureURL: _.get(
        _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
      ),
    });
  };

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <main>
            <Navbar />
            <Header />
            <Footer />
            <Routes>
              <Route path="/header" element={<Header />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
