import * as R from 'ramda';
const apiAdress = "88c78108904ca56d835e78f984afdc14";

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  weather_INPUT: 'weather_INPUT',
  SAVE_weather: 'SAVE_weather',
  DELETE_weather: 'DELETE_weather',
  DATA_LOAD: "DATA_LOAD",
  UPDATE_DATA: "UPDATE_DATA"
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function weatherInputMsg(description) {
  return {
    type: MSGS.weather_INPUT,
    description,
  };
}

export const loadData = { type: MSGS.DATA_LOAD };
export const updateWeatherMSG = (currnetData) => ({ type: MSGS.UPDATE_DATA, currnetData });
export const saveweatherMsg = { type: MSGS.SAVE_weather };

export function deleteweatherMsg(id) {
  return {
    type: MSGS.DELETE_weather,
    id,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '' };
    }
    case MSGS.DATA_LOAD: {
      return {
        model,
        command: {
          url: "https://api.openweathermap.org/data/2.5/weather?q="+ model.description +"&units=metric&appid=" + apiAdress,
        },
      };
    }
    case MSGS.UPDATE_DATA: {
      const { currnetData } = msg;
      return { ...model, temp: currnetData.temp, low: currnetData.temp_min, high: currnetData.temp_max };
    }
    case MSGS.weather_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MSGS.SAVE_weather: {
        const updatedModel = add(msg, model);
        return updatedModel;
    }
    case MSGS.DELETE_weather: {
      const { id } = msg;
      const weathers = R.filter(
        weather => weather.id !== id, 
        model.weathers);
      return { ...model, weathers };
    }
  }
  return model;
}

function add(msg, model) {
    const { nextId, description, temp, low, high } = model;
    const weather = { id: nextId, description, temp, low, high};
    const weathers = [...model.weathers, weather]
    return {...model, weathers, nextId: nextId + 1, description: '', showForm: false};
}

export default update;