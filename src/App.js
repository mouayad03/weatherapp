import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import axios from 'axios';
import { updateWeatherMSG, saveweatherMsg } from "./Update";

function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);
    function dispatch(msg){
      if (msg.type === "DATA_LOAD") {
        const { model: updatedModel, command } = update(msg, model);
        model = updatedModel;
        if (command) {
          httpEffect(dispatch, command);
        }
      } 
      else if (msg.type === "UPDATE_DATA") {
        model = update(msg, model);
        dispatch(saveweatherMsg);
      }
      else {
        model = update(msg, model);
      }
      const updatedView = view(dispatch, model);
      const patches = diff(currentView, updatedView);
      rootNode = patch(rootNode, patches);
      currentView = updatedView;
    }
  }

  const httpEffect = (dispatch, command) => {
    const { url } = command;
    axios.get(url).then((response) => {
      dispatch(updateWeatherMSG(response.data.main));
    });
  };
  
export default app;