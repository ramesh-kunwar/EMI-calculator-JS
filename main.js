const loanAmountInput = document.querySelector("#loan-amount-input");
const interestRateInput = document.querySelector("#interest-rate-input");
const payableTimeInput = document.querySelector("#payable-time-input");

const submitBtn = document.querySelector("button");

// OUTPUT SECTION SELECTORS
const interestAmountPayment = document.querySelector("#interest-amout-output");
console.log(interestAmountPayment);
const monthlyPaymentOutput = document.querySelector("#monthly-payable-output");
console.log(monthlyPaymentOutput);
const totalAmountOutput = document.querySelector("#total-amount-output");

const inputFormSection = document.querySelector("#input-form-section");

// Getting Data From The User
function getLoanAmount() {
  const loanAmount = parseInt(loanAmountInput.value);
  return loanAmount;
}
function getInterestRate() {
  const interestRate = parseFloat(interestRateInput.value);
  return interestRate;
}
function getPayableTimeInYear() {
  const payableTime = parseFloat(payableTimeInput.value) * 12;
  return payableTime;
}

// CALCULATIONS
function calculateMontlyPayment() {
  // EMI = P x R x (1+R)^N / [(1+R)^N-1]
  const principalAmount = getLoanAmount();
  const interestRatePerMOnth = getInterestRate() / 100 / 12;
  const numberOfYear = getPayableTimeInYear();

  //  Using EMI FORMULA
  const upper =
    principalAmount *
    interestRatePerMOnth *
    Math.pow(1 + interestRatePerMOnth, numberOfYear);

  const lower = Math.pow(1 + interestRatePerMOnth, numberOfYear) - 1;

  const EMI = (upper / lower).toFixed(2);
  return EMI;
}

function calculateTotalPayableAmount() {
  return calculateMontlyPayment() * getPayableTimeInYear();
}

function calculateTotalInterest() {
  return (calculateTotalPayableAmount() - getLoanAmount()).toFixed(3);
}

// DISPLAYING THE RESULT
function displayResult() {
  interestAmountPayment.value = calculateTotalInterest();
  monthlyPaymentOutput.value = calculateMontlyPayment();
  totalAmountOutput.value = calculateTotalPayableAmount();
}

// Event Listners
inputFormSection.addEventListener("submit", (e) => {
  e.preventDefault();
  displayResult();
});
