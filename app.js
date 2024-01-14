const form = document.querySelector("form");
const cardholderName = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const expDate = document.getElementById("exp-date");
const expYr = document.getElementById("exp-yr");
const cvc = document.getElementById("cvc");
const continueBtn = document.querySelector(".continue");
const completeState = document.querySelector(".complete-state");
const cardBackCvc = document.querySelector(".card-back__cvc");
const cardFrontNumber = document.querySelector(".card-front__number");
const cardFrontName = document.querySelector(".card-front__name");
const cardFrontMonth = document.querySelector(".card-front__month");
const cardFrontYear = document.querySelector(".card-front__year");

function setCardName(e) {
  cardFrontName.innerHTML = e.target.value; /*I dont need to use 
  .trim() to remove any places the user might input because it is
  working without using .trim()*/
}
function setCardNumber(e) {
  cardFrontNumber.innerHTML = format(e.target.value);
}
function setCardMonth(e) {
  cardFrontMonth.innerHTML = e.target.value;
}
function setCardYear(e) {
  cardFrontYear.innerHTML = e.target.value;
}
function setCardCvc(e) {
  cardBackCvc.innerHTML = e.target.value;
}

cardholderName.addEventListener("keyup", setCardName);
/*cardholderName is the e.target and 
addEventListener is the e and 
whatever the user types into this input will be the .value*/
cardNumber.addEventListener("keyup", setCardNumber);
expDate.addEventListener("keyup", setCardMonth);
expYr.addEventListener("keyup", setCardYear);
cvc.addEventListener("keyup", setCardCvc);

/*TO GET THE USERs INPUTS DYNAMICALLY ONTO THE FRONT AND BACK CARDS*/
function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$& ");
  /*so that we put a space between each set of 4 numbers so no 
  matter if the user inputs that way or not it will work
  remember you MUST have a space after the & and before the "*/
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});
/*To get the error messages*/
function checkInputs() {
  const cardholderNameValue = cardholderName.value.trim();
  const cardNumberValue = cardNumber.value.trim();
  const expDateValue = expDate.value.trim();
  const expYrValue = expYr.value.trim();
  const cvcValue = cvc.value.trim();

  if (cardholderNameValue === "") {
    setError(cardholderName, "Can't be blank");
  } else {
    setSuccessColor(cardholderName);
  }

  if (cardNumberValue === "") {
    setError(cardNumber, "Can't be blank");
  } else if (cardNumberValue.length < 16 || cardNumberValue.length > 16) {
    setError(cardNumber, "This must be exactly 16 digits");
  } else {
    setSuccessColor(cardNumber);
  }

  if (expDateValue === "") {
    setError(expDate, "Can't be blank");
  } else {
    setSuccessColor(expDate);
  }

  if (expYrValue === "") {
    setError(expYr, "Can't be blank");
  } else {
    setSuccessColor(expYr);
  }

  if (cvcValue === "") {
    setError(cvc, "Can't be blank");
  } else if (cvcValue.length < 3 || cvcValue.length > 3) {
    setError(cvc, "Must be 3 digits");
  } else {
    setSuccessColor(cvc);
  }

  if (
    cardholderNameValue &&
    cardNumberValue.length === 16 &&
    expDateValue &&
    expYrValue &&
    cvcValue
  ) {
    setSuccess();
  }
}

function setError(input, message) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector("small");

  formControl.classList.add("error");
  formControl.classList.remove("success");
  errorMsg.innerText = message;
}
function setSuccessColor(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
}

function setSuccess() {
  form.classList.add("hidden");
  completeState.classList.remove("hidden");
}

/*To get back to the original screen*/
continueBtn.addEventListener("click", () => {
  completeState.classList.add("hidden");
  form.classList.remove("hidden");
});
