const name_input = document.querySelector("#name_on_form");

function onlyNumbers(val) {
  if (val === null || val === undefined || val === "") return false;
  for (let i = 0; i < val.length; i++) {
    if (val[i] < "0" || val[i] > "9") return false;
  }
  return true;
}

function onlyAlpha(val) {
  if (val === null || val === undefined || val === "") return false;
  for (let i = 0; i < val.length; i++) {
    if ((val[i] < "A" || val[i] > "Z") && (val[i] < "a" || val[i] > "z") && val[i] != ' ' && String.val) return false;
  }
  return true;
}

const inputs = {
  name: {
    selector: document.querySelector("#name_on_form"),
    reference: document.querySelector("#holder_on_card"),
    valid: (val) => onlyAlpha(val) && val.length >= 3 && val.length <= 26,
    error: document.querySelector("#name_error"),
    error_message: "Wrong format, letters only, 3-26 characters",
  },
  number: {
    selector: document.querySelector("#number_on_form"),
    reference: document.querySelector("#number_on_card"),
    valid: (val) => onlyNumbers(val) && val.length === 16,
    spacing : 4,
    error: document.querySelector("#number_error"),
    error_message: "Wrong format, numbers only, 16 digits",
  },
  expMonth: {
    selector: document.querySelector("#MM_on_form"),
    reference: document.querySelector("#MM_on_card"),
    valid: (val) => val >= 1 && val <= 12 && onlyNumbers(val) && val.length >= 2,
    error: document.querySelector("#MM_error"),
    error_message: "Wrong format, numbers only, 01-12",

  },
  expYear: {
    selector: document.querySelector("#YY_on_form"),
    reference: document.querySelector("#YY_on_card"),
    valid: (val) => val >= 23 && val <= 99 && onlyNumbers(val) && val.length >= 2,
    error: document.querySelector("#YY_error"),
    error_message: "Wrong format, numbers only, 23-99",
  },
  cvc: {
    selector: document.querySelector("#cvc_on_form"),
    reference: document.querySelector("#cvc_on_card"),
    valid: (val) => onlyNumbers(val) && val >= 1 && val <= 999 && val.length == 3,
    error: document.querySelector("#cvc_error"),
    error_message: "Wrong format, numbers only, 001-999",
  },
};

for (let key in inputs) {
  inputs[key].selector.addEventListener("input", () => {
    if (inputs[key].spacing) {
        inputs[key].reference.innerHTML = inputs[key].selector.value.replace(/(\d{4})/g, "$1 ").trim();
    }
    else {
        inputs[key].reference.innerHTML = inputs[key].selector.value;
    }
    if (inputs[key].valid)
    {
        val = inputs[key].selector.value;
        if (!inputs[key].valid(val)) {
            inputs[key].selector.style.border = "2px solid red";
            if (inputs[key].selector.value === "")
            {
                inputs[key].error.innerHTML = "Cannot be empty";
            }
            else
            {
                inputs[key].error.innerHTML = inputs[key].error_message;
            }
        } else {
            inputs[key].selector.style.border = "1px solid rgb(200, 200, 200)";
            inputs[key].error.innerHTML = "";
        }
    }
  });
}

const button = document.querySelector("#button_on_form");

button.addEventListener("click", () => {
    for (let key in inputs) {
        val = inputs[key].selector.value;
        if (!inputs[key].valid(val) || val === "") {
            document.querySelector("#button_error").innerHTML = "Fix all errors before submitting";
            document.querySelector("#button_error").style.color = "red";
            return;
        }
    }
    document.querySelector("#button_error").innerHTML = "";
    document.querySelector(".Form").style.display = "none";
    document.querySelector(".Success").style.display = "flex";
});

const back_button = document.querySelector("#button_on_success");

back_button.addEventListener("click", () => {
    document.querySelector(".Form").style.display = "flex";
    document.querySelector(".Success").style.display = "none";
});