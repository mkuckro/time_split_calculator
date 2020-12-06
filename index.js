// access user inputs from form
const formInput = document.querySelector('#input-form');

const convertSecondsToMinutes = (seconds) => seconds / 60;

const calculateRemainingSeconds = (outputSeconds, outputMinutes, secondsResult) =>
  (outputSeconds + secondsResult) - (outputMinutes * 60);

const getTotalInputSeconds = () => {
  const inputMinutes = Number(document.querySelector('#user-input-minutes').value);
  const inputSeconds = Number(document.querySelector('#user-input-seconds').value);

  return (inputMinutes * 60) + inputSeconds;
}

const calculateOutput = (timeSplitType, totalInputSeconds) => {
  // split input: 120 seconds / 500 meters = x / 825
  // time input: 300 seconds / 825 meters = x / 500 meters
  let outputSeconds = timeSplitType === 'time' ? (totalInputSeconds / 825) * 500 : (totalInputSeconds / 500) * 825;

  return {
    outputSeconds,
    outputMinutes: convertSecondsToMinutes(outputSeconds)
  }
}

const showCalculatedResult = (timeSplitType, remainingSeconds, outputMinutes) => {
  const displayResult = getDisplayResult(outputMinutes, remainingSeconds);

  // access the display result element
  const calculatedResultDiv = document.querySelector('#calculated-result');
  // set the calculated result as the display HTML text 
  if (timeSplitType === 'time') {
    calculatedResultDiv.innerHTML = `Your ${'split'.bold()} is ${displayResult}/500m`;
  } else if (timeSplitType === 'split') {
    calculatedResultDiv.innerHTML = `Your ${'time'.bold()} is ${displayResult}/825m`;
  }

}

// display leading 0 if the remaining seconds are less than 10 and no leading 0 if greater than 10
const getDisplayResult = (outputMinutes, remainingSeconds) =>
  remainingSeconds < 10
    ? `${Math.floor(outputMinutes)}:0${remainingSeconds.toFixed(1)}`
    : `${Math.floor(outputMinutes)}:${remainingSeconds.toFixed(1)}`;


formInput.addEventListener('submit', function (e) {
  e.preventDefault();

  const timeSplitType = document.querySelector('#time-split').value;

  const totalInputSeconds = getTotalInputSeconds()

  const { outputSeconds, outputMinutes } = calculateOutput(timeSplitType, totalInputSeconds)

  // convert output minutes integer to seconds
  const secondsResult = (outputMinutes - Math.floor(outputMinutes)) * 60;
  const remainingSeconds = calculateRemainingSeconds(outputSeconds, outputMinutes, secondsResult);

  showCalculatedResult(timeSplitType, remainingSeconds, outputMinutes)
});
