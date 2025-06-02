//https://github.com/chrisenitan/Whave
//https://developer.chrome.com/extensions/getstarted
//updates https://developer.chrome.com/webstore/update
//storage api https://developer.chrome.com/docs/extensions/reference/api/storage#property-local

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

let log = (a) => {
  console.log({ msg: a, time: new Date(), service: "Whatsapp theme manager" })
}

/**
 * Determines time bound for theme used from system.
 */
let isNightRule = (currentHour) => {
  return currentHour >= 20 || currentHour <= 7
}

let switchTheme = (req) => {
  //local var because we need this to be refreshed each time
  //get the current time
  var time = new Date()
  var hour = time.getHours()
  var stampTime = `${hour}:${time.getMinutes()}`

  //req is defined: try to set according to the requested time
  if (req == undefined) {
    var checkOverride = document.body.getAttribute("class")
    //This changes to dark mode from 8pm to 7am
    if (isNightRule(hour)) {
      //check for manual override
      if (checkOverride == "web flaba" || checkOverride == "web dark flaba") {
        //do not change theme if class was dark or not
        log("Cannot change theme after manual override")
      } else {
        //change theme to darkmode
        document.body.classList.add("dark")
        log(`Dark mode triggered at ${stampTime}`)
      }
    }
    //This changes to light mode from 8pm to 7am
    else {
      //check for manual override
      if (checkOverride == "web dark flaba" || checkOverride == "web flaba") {
        //do not change theme if class was light or not
        log("Cannot change theme after manual override")
      } else {
        //change theme to light mode
        document.body.classList.remove("dark")
        log(`Light mode triggered at ${stampTime}`)
      }
    }
  }

  //req defined, must be manual override
  else {
    let manualTheme = req.manual || "system"
    chrome.storage.sync.set({ manualTheme }).then(() => {
      log({ msg: `current theme manually set to ${manualTheme}` })
    })
    if (req.manual == "startLight") {
      document.body.classList.remove("dark")
      log(`Light mode manually triggered at ${stampTime}`)
    } else if (req.manual == "startDark") {
      document.body.classList.add("dark")
      log(`Dark mode manually triggered at ${stampTime}`)
    } else {
      //this should not happen for now
    }
  }
}

let resetTheme = () => {
  chrome.storage.sync.set({ manualTheme: "system" }).then(() => {
    log({ msg: "successfully reset theme settings" })
  })
  //get the current time
  var time = new Date()
  var currentHour = time.getHours()
  //change theme back according to the time
  if (isNightRule(currentHour)) {
    document.body.classList.add("dark")
    log(`Reset to Dark mode as at ${currentHour}hr`)
  } else {
    document.body.classList.remove("dark")
    log(`Reset to Light mode as at ${currentHour}hr`)
  }
}

//listen: change to proper theme when user clicks app
window.addEventListener("click", function () {
  chrome.storage.sync.get(["manualTheme"]).then((result) => {
    const { manualTheme } = result
    if (!manualTheme) return switchTheme()
    if (!["startDark", "startLight"].includes(manualTheme)) switchTheme()
  })
})

//button: start dark mode manually
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

//button: start light mode manually
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

//button: reset modes
document.getElementById("resetThemes").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: resetTheme,
    })
  })
})
