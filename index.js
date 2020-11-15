// access user inputs from form
const formInput = document.querySelector('#input-form');
const inputType = document.querySelector('#time-split');
const inputMinutesSelector = document.querySelector('#user-input-minutes');
const inputSecondsSelector = document.querySelector('#user-input-seconds');

// functionality for when "calculate" button is clicked
formInput.addEventListener('submit', function(e) {
  // store value for input type (time or split) to type variable
  const type = inputType.value;

  // store user inputs for minutes and seconds converted to number data types to variables
  const inputMinutes = Number(inputMinutesSelector.value);
  const inputSeconds = Number(inputSecondsSelector.value);

  // calculate total seconds from minute and second inputs
  const totalInputSeconds = (inputMinutes * 60) + inputSeconds;

  // prevents default form submit action
  e.preventDefault();

  // split input: 120 seconds / 500 meters = x / 825
  // time input: 300 seconds / 825 meters = x / 500 meters
  // initialize output variable
  let outputSeconds = 0;
  // assign calculated output in seconds to outputSeconds variable depending on whether the user input was time or split
  if (type === 'time') {
    outputSeconds = (totalInputSeconds / 825) * 500;
  } else if (type === 'split') {
    outputSeconds = (totalInputSeconds / 500) * 825;
  }

  // convert outputSeconds to minutes for display
  const outputMinutes = outputSeconds / 60;
  // convert output minutes integer to seconds
  const secondsResult = (outputMinutes - Math.floor(outputMinutes)) * 60;
  // calculate seconds remaining from outputMinutes and add to remaining seconds
  const remainingSeconds = (outputSeconds + secondsResult) - (outputMinutes * 60);

  let displayResult;
  // display leading 0 if the remaining seconds are less than 10 and no leading 0 if greater than 10
  if (remainingSeconds < 10) {
    displayResult = `${Math.floor(outputMinutes)}:0${remainingSeconds.toFixed(1)}`;
  } else {
    displayResult = `${Math.floor(outputMinutes)}:${remainingSeconds.toFixed(1)}`;
  }

  // access the display result element
  const calculatedResultDisplay = document.querySelector('#calculated-result');

  // set the calculated result as the display HTML text 
  if (type === 'time') {
    calculatedResultDisplay.innerHTML = `Your ${'split'.bold()} is ${displayResult}/500m`;
  } else if (type === 'split') {
    calculatedResultDisplay.innerHTML = `Your ${'time'.bold()} is ${displayResult}/825m`;
  }
});
