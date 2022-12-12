const axios = require("axios");

const APPID = "88c78108904ca56d835e78f984afdc14";

async function main() {
  function weatherUrl(city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&APPID=${APPID}`;
  }

  const url = weatherUrl("Bern");
  try {
    const response = await axios({ url });
    const { main } = response.data;
    const { temp, temp_min, temp_max } = main;
    console.log(temp, temp_min, temp_max);
    //dispatch(MSG.UPDATE_LOCATION, data)
  } catch (error) {
    console.log(error.message);
    //dispatch(MSG.SHOW_ERROR, error.message)
  }
}

main();
