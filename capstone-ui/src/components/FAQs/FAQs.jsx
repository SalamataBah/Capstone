import React from "react";
import Faq from "react-faq-component";
import "./FAQs.css";

const data = {
  title: "FAQs about Meet and Match",
  rows: [
    {
      title: "What is Meet and Match?",
      content:
        "Website for you to find a mentor or mentee that has interests that align with yours",
    },
    {
      title: "How does the Algorithm work?",
      content:
        "The algorithm stores your information and using the premise of graph theory it analyses your information and find someone who is similar to you ",
    },
    {
      title: "What is your story?",
      content:
        "The app is built to connect those who have similar academic/professional goals",
    },
    {
      title: "Can I meet with my mentor/mentee in-person?",
      content: "the rules are between you and your mentee/mentor",
    },
  ],
};

const styles = {
  bgColor: "#031B34 ",
  titleTextColor: "white",
  titleText: "center",
  rowTitleColor: "white",
};

export default function Faqs() {
  return (
    <div className="faq">
      <Faq data={data} styles={styles} />
    </div>
  );
}
