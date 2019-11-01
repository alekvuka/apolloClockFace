import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { me as device } from "device";
import { display } from "display";

//change background image based on device/screen size 
const img = document.getElementById("image");
if (device.modelName === "Ionic") {
  img.href = "forIonic.jpg";
} else {
  img.href = "forVersa.jpg";
}

// Update the clock every second
clock.granularity = "seconds";

//create a HeartRateSensor object
const hrm = new HeartRateSensor();

const myLabel = document.getElementById("myLabel");
const heartRate = document.getElementById("heartRate");

clock.ontick = (evt) => {
  
  // stop the hr sensor if the creen is off
  if(display.on){
    hrm.start();
  }else{
    hrm.stop();
  }
  
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
    hours = util.zeroPad(hours)
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let min = util.zeroPad(today.getMinutes());
  let sec = util.zeroPad(today.getSeconds());

  myLabel.text =  `${hours}         ${min}        ${sec}`;
  heartRate.text = `${hrm.heartRate}`
}
