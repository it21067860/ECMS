// src/components/PaymentDetails.js
const React = require("react");
const { useState } = require("react");
const { useLocation, useNavigate, useParams } = require("react-router-dom");
const { createDonation } = require("../api");
require("../styles.css"); // Import CSS

const PaymentDetails = () => {
  const { homeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({ name: "", number: "", cvc: "" });

  const validateCard = () => {
    let isValid = true;
    const newErrors = { name: "", number: "", cvc: "" };

    if (!cardDetails.name.trim()) {
      newErrors.name = "Cardholder name is required";
      isValid = false;
    }

    if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number)) {
      newErrors.number = "Card number must be 16 digits";
      isValid = false;
    }

    if (!cardDetails.cvc || !/^\d{3}$/.test(cardDetails.cvc)) {
      newErrors.cvc = "CVC must be 3 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDelete = () => {
    navigate("/");
  };

  const handlePay = async () => {
    if (!validateCard()) return;

    try {
      const donationData = {
        amount: state.amount,
        currency: state.currency,
        paymentMethod: "Card",
        transactionId: `TXN-${Date.now()}`,
        homeId,
      };
      await createDonation(donationData);
      navigate(`/thank-you/${homeId}`);
    } catch (error) {
      alert(`Payment failed: ${error.message}`);
    }
  };

  return React.createElement(
    "div",
    { className: "payment-details" },
    React.createElement("h1", null, "Payment Details"),
    React.createElement("p", null, `Amount: ${state.amount} ${state.currency}`),
    React.createElement("p", null, "Home Account: 1234-5678-9012 (Bank XYZ)"),
    React.createElement("button", { onClick: handleDelete }, "Delete"),
    React.createElement(
      "div",
      null,
      React.createElement("input", {
        placeholder: "Cardholder Name",
        value: cardDetails.name,
        onChange: (e) => setCardDetails({ ...cardDetails, name: e.target.value }),
      }),
      errors.name &&
        React.createElement("span", { className: "error" }, errors.name),
      React.createElement("input", {
        placeholder: "Card Number",
        value: cardDetails.number,
        onChange: (e) => setCardDetails({ ...cardDetails, number: e.target.value }),
      }),
      errors.number &&
        React.createElement("span", { className: "error" }, errors.number),
      React.createElement("input", {
        placeholder: "CVC",
        value: cardDetails.cvc,
        onChange: (e) => setCardDetails({ ...cardDetails, cvc: e.target.value }),
      }),
      errors.cvc &&
        React.createElement("span", { className: "error" }, errors.cvc)
    ),
    React.createElement(
      "button",
      { onClick: handlePay, disabled: !state.amount || !state.currency },
      "Pay Now"
    )
  );
};

module.exports = PaymentDetails;