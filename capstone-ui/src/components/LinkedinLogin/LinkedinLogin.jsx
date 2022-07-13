// const [state, setState] = useState({
//     isAuthorized: false,
//     firstName: null,
//     lastName: null,
//     profileURL: null,
//     pictureURL: null,
//   });

//   window.addEventListener("message", handlePostMessage);

//   const handlePostMessage = (event) => {
//     if (event.data.type === "profile") {
//       updateProfile(event.data.profile);
//       // Alert.success(
//       //   `Login Successfully: ${event.data.profile.localizedFirstName}`,
//       //   { position: "top" }
//       // );
//     }
//   };

//   const updateProfile = (profile) => {
//     setState({
//       isAuthorized: true,
//       firstName: _.get(profile, "localizedFirstName", ""),
//       lastName: _.get(profile, "localizedLastName", ""),
//       profileURL: `https://www.linkedin.com/in/${_.get(
//         profile,
//         "vanityName",
//         ""
//       )}`,
//       pictureURL: _.get(
//         _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
//         "identifiers[0].identifier",
//         ""
//       ),
//     });
//   };

//   requestProfile = () => {
//     var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
//     console.log("oauthUrl: ", oauthUrl);
//     var width = 450,
//       height = 730,
//       left = window.screen.width / 2 - width / 2,
//       top = window.screen.height / 2 - height / 2;

//     window.open(
//       oauthUrl,
//       "Linkedin",
//       "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
//         width +
//         ", height=" +
//         height +
//         ", top=" +
//         top +
//         ", left=" +
//         left
//     );
//   };
