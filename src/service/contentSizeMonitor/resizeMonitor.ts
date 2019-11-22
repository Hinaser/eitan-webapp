type ResizeEventListener = (windowWidth: number, windowHeight: number) => void;

interface IGenerateOptimizedResizeEventReturnValue {
  addListener: (cb: ResizeEventListener) => void;
  removeListener: (cb: ResizeEventListener) => void;
}

export function getWindowSize(){
  const width = window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width,
    height,
  };
}

function generateOptimizedResizeEvent(): IGenerateOptimizedResizeEventReturnValue {
  const callbacks: ResizeEventListener[] = [];
  let running = false;
  
  // run the actual callbacks
  function runCallbacks(){
    const {width: windowWidth, height: windowHeight} = getWindowSize();
    
    callbacks.forEach((callback) => {
      callback(windowWidth, windowHeight);
    });
    
    running = false;
  }
  
  // fired on resize event
  function resize(){
    if (!running) {
      running = true;
      
      if (window.requestAnimationFrame){
        window.requestAnimationFrame(runCallbacks);
      }
      else {
        setTimeout(runCallbacks, 66);
      }
    }
  }
  
  // adds callback to loop
  function addCallback(callback: ResizeEventListener){
    if (callback) {
      callbacks.push(callback);
    }
  }
  
  function removeCallback(callback: ResizeEventListener){
    const index = callbacks.findIndex(cb => cb === callback);
    if(index >= 0){
      callbacks.splice(index, 1);
    }
  }
  
  return {
    // public method to add additional callback
    addListener: (callback: ResizeEventListener) => {
      if(!callbacks.length){
        window.addEventListener("resize", resize);
      }
      addCallback(callback);
    },
    removeListener: (callback: ResizeEventListener) => {
      if(typeof(callback) === "function"){
        removeCallback(callback);
      }
    },
  };
}

export const optimizedResizeEvent = generateOptimizedResizeEvent();
