//https://github.com/chrisenitan/Whave
//https://developer.chrome.com/extensions/getstarted
//updates https://developer.chrome.com/webstore/update

let switchTheme = (req) => {
  //local var because we need this to be refreshed each time

  //get the current time
  var time = new Date()
  var hour = time.getHours()
  var stampTime = `${hour}:${time.getMinutes()}`

  //req is defined: try to set according to the requested time
  if (req == undefined) {
    var checkOverride = document.querySelector(".web").getAttribute("class")
    //This changes to dark mode from 8pm to 7am
    if (hour >= 20 || hour <= 7) {
      //check for manual override
      if (checkOverride == "web flaba" || checkOverride == "web dark flaba") {
        //do not change theme if class was dark or not
        console.log("Cannot change theme after manual override")
      } else {
        //change theme to darkmode
        document.querySelector(".web").setAttribute("class", "web dark")
        console.log(`Dark mode triggered at ${stampTime}`)
      }
    }
    //This changes to light mode from 8pm to 7am
    else {
      //check for manual override
      if (checkOverride == "web dark flaba" || checkOverride == "web flaba") {
        //do not change theme if class was light or not
        console.log("Cannot change theme after manual override")
      } else {
        //change theme to light mode
        document.querySelector(".web").setAttribute("class", "web")
        console.log(`Light mode triggered at ${stampTime}`)
      }
    }
  }
  //no req defined, must be manual override
  else {
    if (req.manual == "startLight") {
      document.querySelector(".web").setAttribute("class", `web ${req.override}`)
      console.log(`Light mode manually triggered at ${stampTime}`)
    } else if (req.manual == "startDark") {
      document.querySelector(".web").setAttribute("class", `web dark ${req.override}`)
      console.log(`Dark mode manually triggered at ${stampTime}`)
    } else {
      //this should not happen for now
    }
  }
}

let resetTheme = () => {
  //get the current time
  var time = new Date()
  var currentHour = time.getHours()
  //change theme back according to the time
  if (currentHour >= 20 || currentHour <= 7) {
    document.querySelector(".web").setAttribute("class", "web dark")
    console.log(`Reset to Dark mode as at ${currentHour}hr`)
  } else {
    document.querySelector(".web").setAttribute("class", "web")
    console.log(`Reset to Light mode as at ${currentHour}hr`)
  }
}

//attach switchTheme function to DOM
window.addEventListener("click", function () {
  switchTheme()
})

/* 
	get the current time and populate tool bar menu
	...need to set this .nextSwitchTime in DOM to avoid log missing element error	
	*/
var time = new Date()
let currentHour = time.getHours()
if (currentHour >= 20 || currentHour <= 7) {
  document.getElementById("nextSwitchTime").innerHTML = "Light mode begins at 7am"
} else {
  document.getElementById("nextSwitchTime").innerHTML = "Dark mode begins at 8pm"
}

/*
   set a custom start and stop time
Need to save this value in storage but still reading on how that works and if we really need that permission to do this. 
   document.getElementById('nextSwitch').addEventListener("click", function(){
    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: `switchTheme("test")`});
          });
    
	}) 
	*/

//start dark mode manually
document.getElementById("startDark").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var req = {
      manual: "startDark",
      override: "flaba",
    }
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: switchTheme,
      args: [req],
    })
  })
})

//start light mode manually
document.getElementById("startLight").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var req = {
      manual: "startLight",
      override: "flaba",
    }
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: switchTheme,
      args: [req],
    })
  })
})

//reset modes and start light mode manually
document.getElementById("resetMo").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: resetTheme,
    })
  })
})
