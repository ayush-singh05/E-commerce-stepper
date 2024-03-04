import './stepper.css'
import { useState, useEffect, useRef } from "react";

const Stepper = ({ stepperInfo = [] }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepperInfo.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepperInfo.length]);

  const handleNextBtn = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepperInfo.length) {
        setIsCompleted(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };
  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepperInfo.length - 1)) * 100;
  };

  const ActiveComponent = stepperInfo[currentStep - 1].component;
  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "20px 0" }}>Checkout</h1>
      <div className="checkout-stepper">
        {stepperInfo.map((step, idx) => (
          <div
            ref={(el) => (stepRef.current[idx] = el)}
            className={`stepper ${currentStep === idx + 1 ? "active" : ""} ${
              currentStep > idx + 1 || isCompleted ? "complete" : ""
            }`}
            key={step.name}
          >
            <div className="number">
              {isCompleted || currentStep > idx + 1 ? (
                <span>&#x2713;</span>
              ) : (
                idx + 1
              )}
            </div>
            <div className="name">{step.name}</div>
          </div>
        ))}
        <div
          className="progressBar"
          style={{
            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="bar"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <div className="btn-container">
        <div>
          <ActiveComponent />
        </div>
        {!isCompleted && (
          <button onClick={handleNextBtn}>
            {currentStep === stepperInfo.length ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
