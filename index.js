const formInput = document.querySelector('#input-form');
const inputType = document.querySelector('#time-split');
const inputMinutesSelector = document.querySelector('#user-input-minutes');
const inputSecondsSelector = document.querySelector('#user-input-seconds');

formInput.addEventListener('submit', function(e) {
  // store value for input type to type variable
  const type = inputType.value;

  const inputMinutes = Number(inputMinutesSelector.value);
  const inputSeconds = Number(inputSecondsSelector.value);

  const totalInputSeconds = (inputMinutes * 60) + inputSeconds;

  // prevents form inputs from being sent wherever they're sent by default
  e.preventDefault();

  // if the type is time, calculate the split/825 meters
  // split input: 120 seconds / 500 meters = x / 825
  // time input: 300 seconds / 825 meters = x / 500 meters
  let outputSeconds = 0;
  // initialize output variable
  if (type === 'time') {
    outputSeconds = (totalInputSeconds / 825) * 500;
  } else if (type === 'split') {
    outputSeconds = (totalInputSeconds / 500) * 825;
  }

  // convert outputSeconds to minutes for display
  const outputMinutes = outputSeconds / 60;
  // multiply decimal places by 60 and add to remaining seconds
  const seconds = (outputMinutes - Math.floor(outputMinutes)) * 60;
  const remainingSeconds = (outputSeconds + seconds) - (outputMinutes * 60);

  let displayResult;
  if (remainingSeconds < 10) {
    displayResult = `${Math.floor(outputMinutes)}:0${remainingSeconds.toFixed(1)}`;
  } else {
    displayResult = `${Math.floor(outputMinutes)}:${remainingSeconds.toFixed(1)}`;
  }

  const calculatedResultDisplay = document.querySelector('#calculated-result');

  if (type === 'time') {
    calculatedResultDisplay.innerHTML = `Your ${'split'.bold()} is ${displayResult}/500m`;
  } else if (type === 'split') {
    calculatedResultDisplay.innerHTML = `Your ${'time'.bold()} is ${displayResult}/825m`;
  }
});
