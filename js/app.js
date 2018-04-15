function calculateGradient(rangeElement, textElement, rate){
    var currentVal = textElement.value = rangeElement.value;
    var maxValue = rangeElement.getAttribute('max');
    var percent = (currentVal * 100) / maxValue;
    rangeElement.style.background ='linear-gradient(90deg, #1091cc ' + percent + '%, #d8d8d8 ' + percent + '%)';
    if(rate){
        textElement.value = currentVal / rate;
    }
}

function initializer() {
    var rangeInput = document.getElementById('range');
    var rangeTextInput = document.getElementById('range-text');

    calculateGradient(rangeInput, rangeTextInput);

    rangeInput.addEventListener('input', function(event){
        calculateGradient(event.target, rangeTextInput, null)
    }, false);


    var rateInput = document.getElementById('rate');
    var rateTextInput = document.getElementById('rate-text');

    rateInput.addEventListener('input', function(event){
        calculateGradient(event.target, rateTextInput, 10)
    });

    calculateGradient(rateInput, rateTextInput);
}

function changethis(event) {
    console.log('drag');
    console.info(event);
}

document.addEventListener('DOMContentLoaded', initializer);
