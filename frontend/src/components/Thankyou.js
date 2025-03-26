// src/components/ThankYou.js
const React = require("react");
require("../styles.css"); // Import CSS

const ThankYou = () => {
  return React.createElement(
    "div",
    { className: "thank-you" },
    React.createElement("h1", null, "Thank You for Your Donation!"),
    React.createElement(
      "p",
      null,
      "Please wait for admin approval. You’ll receive an email once accepted."
    )
  );
};

module.exports = ThankYou;