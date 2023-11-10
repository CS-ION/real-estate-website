import React, { useState } from "react";
import "../App.css";
import "./MortgageCalculator.css";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState("");
  const [pmiAmount, setPmiAmount] = useState("");
  const [hoaFees, setHoaFees] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateMonthlyPayment = () => {
    const inputs = [loanAmount, interestRate, loanTerm];
    if (
      inputs.some((input) => isNaN(parseFloat(input)) || parseFloat(input) <= 0)
    ) {
      setErrorMessage(
        "Please enter valid positive numbers for required fields."
      );
      return;
    }

    const principal = parseFloat(loanAmount);
    const interest = parseFloat(interestRate) / 100 / 12;
    const totalPayments = parseFloat(loanTerm) * 12;

    const numerator =
      principal * interest * Math.pow(1 + interest, totalPayments);
    const denominator = Math.pow(1 + interest, totalPayments) - 1;

    const mortgagePayment = (numerator / denominator).toFixed(2);

    // Consider property tax, insurance, PMI, and HOA fees if applicable
    const totalMonthlyPayment =
      parseFloat(mortgagePayment) +
      parseFloat(propertyTax) +
      parseFloat(insuranceAmount) +
      parseFloat(pmiAmount) +
      parseFloat(hoaFees);

    setMonthlyPayment(totalMonthlyPayment.toFixed(2));
    setErrorMessage("");
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setPropertyTax("");
    setInsuranceAmount("");
    setPmiAmount("");
    setHoaFees("");
    setMonthlyPayment(null);
    setErrorMessage("");
  };

  return (
    <div className="mortgage_calculator">
      <h1 className="heading">Mortgage Calculator</h1>
      <div className="mortgage_contents">
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Loan Amount ($)"
        />
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Interest Rate (%)"
        />
      </div>
      <div className="mortgage_contents">
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          placeholder="Loan Term (Years)"
        />
        <input
          type="number"
          value={propertyTax}
          onChange={(e) => setPropertyTax(e.target.value)}
          placeholder="Property Tax ($)"
        />
      </div>
      <div className="mortgage_contents">
        <input
          type="number"
          value={insuranceAmount}
          onChange={(e) => setInsuranceAmount(e.target.value)}
          placeholder="Homeowners Insurance ($)"
        />
        <input
          type="number"
          value={pmiAmount}
          onChange={(e) => setPmiAmount(e.target.value)}
          placeholder="PMI Amount ($)"
        />
      </div>
      <div className="mortgage_contents">
        <input
          type="number"
          value={hoaFees}
          onChange={(e) => setHoaFees(e.target.value)}
          placeholder="HOA Fees ($):"
        />
      </div>
      <div className="mortgage_contents">
        <button onClick={calculateMonthlyPayment}>Calculate</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {monthlyPayment !== null && (
        <div>
          <h2>Monthly Payment: ${monthlyPayment}</h2>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
