function calculateGradient(rangeElement, textElement, rate) {
    var currentVal = textElement.value = rangeElement.value;
    var maxValue = rangeElement.getAttribute('max');
    var percent = (currentVal * 100) / maxValue;
    rangeElement.style.background = 'linear-gradient(90deg, #1091cc ' + percent + '%, #d8d8d8 ' + percent + '%)';
    if (rate) {
        textElement.value = currentVal / rate;
    }
}

function preventTypeNonNumbers(event){
    if (event.which < 48 || event.which > 57) {
        event.preventDefault();
    }
}

function initializer() {
    var rangeInput = document.getElementById('range');
    var rangeTextInput = document.getElementById('range-text');

    calculateGradient(rangeInput, rangeTextInput);

    rangeInput.addEventListener('input', function (event) {
        calculateGradient(event.target, rangeTextInput, null)
    }, false);


    var rateInput = document.getElementById('rate');
    var rateTextInput = document.getElementById('rate-text');

    rateInput.addEventListener('input', function (event) {
        calculateGradient(event.target, rateTextInput, 10)
    });

    calculateGradient(rateInput, rateTextInput, 10);

    var textInputs = document.querySelectorAll('input[type=text]');

    textInputs.forEach(function(input){
        input.addEventListener('keypress', preventTypeNonNumbers);
        input.addEventListener('paste', function(e){e.preventDefault()});
    });

    var form = document.getElementById('mc-form');
    form.addEventListener('submit', validateForm)
}

function calculateMorgage(form) {

    var yearsOfMortgage = form.elements['range-text'].value;
    var interestRate = form.elements['rate-text'].value;
    var loanAmount = form.elements['loan'].value;
    var annualTax = form.elements['tax'].value;
    var annualInsurance = form.elements['insurance'].value;


    // var principleAndInterests = ((interestRate / 100) / 12) * loanAmount / (1 - Math.pow((1 + ((interestRate / 100) / 12)), -yearsOfMortgage * 12));
    var principleAndInterests = ((interestRate / 100) / 12) * loanAmount / (1 - Math.pow((1 + ((interestRate / 100) / 12)), -yearsOfMortgage * 12));
    var tax = annualTax / 12;
    var insurance = annualInsurance / 12;
    var monthlyPayment = principleAndInterests + tax + insurance;

    var principleElement = document.getElementById('principle-and-interests');
    principleElement.innerText = principleAndInterests.toFixed(2);
    principleElement.parentElement.classList.add('result');

    var taxResult = document.getElementById('tax-result');
    taxResult.innerText = tax.toFixed(2);
    taxResult.parentElement.classList.add('result');

    var insuranceResult = document.getElementById('insurance-result');
    insuranceResult.innerText = insurance.toFixed(2);
    insuranceResult.parentElement.classList.add('result');

    var monthyPaymentResult = document.getElementById('monthly-payment');
    monthyPaymentResult.innerText = monthlyPayment.toFixed(2);
    monthyPaymentResult.parentElement.classList.add('result');

    form.querySelectorAll('button')[0].innerText = 'Recalculate';
}

function validateForm(event) {
    event.preventDefault();
    var form = this;
    var inputs = form.querySelectorAll('input');
    var valid = true;

    inputs.forEach(function (element, index) {
        element.classList.remove('has-error');
        if (element.nextElementSibling != null && element.nextElementSibling.classList.contains('helper')) {
            element.nextElementSibling.style.display = 'none';
        }
        if (element.getAttribute('required') !== null) {
            if (isNaN(parseFloat(element.value)) || element.value.trim().length === 0) {
                element.classList.add('has-error');
                if (element.nextElementSibling != null && element.nextElementSibling.classList.contains('helper')) {
                    element.nextElementSibling.style.display = 'block';
                }
                valid = false;
            }
        }
    });

    if (valid) {
        calculateMorgage(this);
    }
}

document.addEventListener('DOMContentLoaded', initializer);
