// Input Selectors
const loanAmountInput = document.querySelector("#loan-amount-input");
const interestRateInput = document.querySelector("#interest-rate-input");
const payableTimeInput = document.querySelector("#payable-time-input");

// Button Selector
const submitBtn = document.querySelector("button");

// OUTPUT SECTION SELECTORS
const interestAmountPayment = document.querySelector("#interest-amout-output");
const monthlyPaymentOutput = document.querySelector("#monthly-payable-output");
const totalAmountOutput = document.querySelector("#total-amount-output");
const principalAmountOutput = document.querySelector("#principal-amout-output");
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

// PERFORMING CALCULATIONS
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

  const EMI = (upper / lower).toFixed(3);
  return EMI;
}

function calculateTotalPayableAmount() {
  return (calculateMontlyPayment() * getPayableTimeInYear()).toFixed(3);
}

function calculateTotalInterest() {
  return (calculateTotalPayableAmount() - getLoanAmount()).toFixed(3);
}

// DISPLAYING THE RESULT
function displayResult() {
  interestAmountPayment.textContent = calculateTotalInterest();
  monthlyPaymentOutput.textContent = calculateMontlyPayment();
  totalAmountOutput.textContent = calculateTotalPayableAmount();
  principalAmountOutput.textContent = getLoanAmount();
}

// Event Listner
inputFormSection.addEventListener("submit", (e) => {
  e.preventDefault();
  displayResult();

  displayChart(
    interestAmountPayment.textContent,
    principalAmountOutput.textContent
  );
});

// displaying chart at beginning
displayChart(0, 0);

// CHART FUNCTION
function displayChart(interest, principal) {
  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById("main"));

  // Specify the configuration items and data for the chart
  let option = {
    title: {
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: interest,
            name: "Total Interest",
          },
          {
            value: principal,
            name: "Principal Amount",
          },
          // {
          //   value: 1548,
          //   name: 'C'
          // }
        ],
        radius: ["40%", "70%"],
      },
    ],
  };
  myChart.setOption(option);
}
