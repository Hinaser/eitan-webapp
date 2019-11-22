import * as React from "react";
import * as ReactDOM from "react-dom";
import {Store} from "redux";
import {Provider} from "react-redux";
import ReactGA from "react-ga";
import * as serviceWorker from "./serviceWorker";
import {doPreRenderingTasks, initializeStore} from "./init";
import App from "./module/App/index";
import "./global.css";
import {mountPointNodeId} from "./index.config";


function renderMainApp(store: Store){
  let nodeToMount = document.getElementById(mountPointNodeId);
  if(!nodeToMount){
    nodeToMount = document.createElement("div");
    nodeToMount.id = mountPointNodeId;
    document.body.appendChild(nodeToMount);
  }
  
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  ReactDOM.render(app, nodeToMount);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
  
  return function unMount(){
    if(!nodeToMount){
      return;
    }
    ReactDOM.unmountComponentAtNode(nodeToMount);
    document.body.removeChild(nodeToMount);
  };
}

async function main(){
  if(process.env.REACT_APP_GA_ID){
    ReactGA.initialize(process.env.REACT_APP_GA_ID, {
      debug: process.env.REACT_APP_DEBUG_GA === "enable",
    });
  }
  
  if(process.env.NODE_ENV === "development" && process.env.REACT_APP_ENABLE_WHY_DID_YOU_UPDATE === "true"){
    const whyDidYouRender = require("@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js");
    whyDidYouRender(React, {include: [/.*View$/]});
  }
  
  const {store} = initializeStore();
  
  if(process.env.REACT_APP_ENV === "development"){
    const start = Date.now();
    
    await doPreRenderingTasks();
    
    const elapsedTime = Date.now() - start;
    console.log("Pre rendering time", elapsedTime);
  }
  else{
    await doPreRenderingTasks();
  }
  
  return renderMainApp(store);
}

if(process.env.REACT_APP_ENV === "development"){
  (async () => await main())();
}
else{
// @ts-ignore
  window.loadApp = main;
}

