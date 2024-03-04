import React from "react";
import Stepper from "./component/Stepper";
import './App.css'

function App() {

  const step = [
    {
      name: "Customer Info",
      component: () => <div>Customer Info</div>,
    },
    {
      name: "Shipping Info",
      component: () => <div>Enter Your Shipping Details</div>,
    },
    {
      name: "Payment",
      component: () => <div>Enter Your Payment Details</div>,
    },
    {
      name: "Delivered",
      component: () => <div>Order Delivered</div>,
    },
  ];
  return (
    <div className="container">
      <Stepper stepperInfo={step} />
    </div>
  );
}

export default App;
