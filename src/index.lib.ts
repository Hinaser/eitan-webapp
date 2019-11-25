import {mountPointNodeId} from "./index.config";

export function closeApp(){
  const nodeToMount = document.getElementById(mountPointNodeId);
  if(!nodeToMount){
    throw new Error("Mount point missing");
  }
  
  const showButtonDiv = document.createElement("div");
  showButtonDiv.id = "show-" + mountPointNodeId;
  showButtonDiv.addEventListener("click", (e) => {
    nodeToMount.style.display = "";
    nodeToMount.style.opacity = "1";
    document.body.removeChild(showButtonDiv);
  });
  showButtonDiv.innerText = "単語テストアプリを開く";
  showButtonDiv.style.fontSize = "14px";
  showButtonDiv.style.position = "fixed";
  showButtonDiv.style.bottom = "16px";
  showButtonDiv.style.left = "16px";
  showButtonDiv.style.background = "#f3f3f3";
  showButtonDiv.style.color = "#333";
  showButtonDiv.style.padding = "8px 16px";
  showButtonDiv.style.cursor = "pointer";
  showButtonDiv.style.borderRadius = "6px";
  showButtonDiv.style.border = "1px solid #ccc";
  
  nodeToMount.style.opacity = "0";
  nodeToMount.style.transition = "all ease .2s";
  const onTransitionEndMountPoint = () => {
    nodeToMount.removeEventListener("transitionend", onTransitionEndMountPoint);
    nodeToMount.style.display = "none";
    document.body.appendChild(showButtonDiv);
  };
  nodeToMount.addEventListener("transitionend", onTransitionEndMountPoint);
}