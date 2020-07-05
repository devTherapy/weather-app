const form = document.querySelector(".form");
const weatherInput = document.querySelector(".weatherInput");
const msgOne = document.querySelector("#msg-one");
const msgTwo = document.querySelector("#msg-two");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = weatherInput.value;
  getForecast(location);
});
async function getForecast(location) {
  try {
    let response = await fetch(
      `http://localhost:3000/weather?address=${location}`
    );
    let data = await response.json();
    if (data.error) {
      msgOne.classList.remove("green");
      msgOne.classList.add("red");
      msgOne.innerHTML = data.error;
    } else {
      let { temperature, region, country } = data.forecast;
      msgOne.classList.remove("red");
      msgOne.classList.add("green");
      msgOne.innerHTML = `it is ${temperature}degree Celsius in ${region} ${country}`;
      // setTimeout(() => {
      //   forecastMsg.remove();
      // }, 5000);
    }
  } catch (e) {
    console.log(e.message);
  }
}
