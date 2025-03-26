// src/components/DonationForm.js
const React = require("react");
const { useState } = require("react");

const DonationForm = ({ onDonate }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDonate({ amount: parseFloat(amount), currency });
  };

  return React.createElement(
    "form",
    { onSubmit: handleSubmit, className: "donation-form" },
    React.createElement(
      "label",
      null,
      "Currency:",
      React.createElement(
        "select",
        {
          value: currency,
          onChange: (e) => setCurrency(e.target.value),
        },
        React.createElement("option", { value: "USD" }, "USD"),
        React.createElement("option", { value: "EUR" }, "EUR"),
        React.createElement("option", { value: "LKR" }, "LKR")
      )
    ),
    React.createElement(
      "label",
      null,
      "Amount:",
      React.createElement("input", {
        type: "number",
        value: amount,
        onChange: (e) => setAmount(e.target.value),
        required: true,
      })
    ),
    React.createElement("button", { type: "submit" }, "Donate")
  );
};

module.exports = DonationForm;