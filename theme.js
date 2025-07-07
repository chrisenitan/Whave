//https://github.com/chrisenitan/Whave
//https://developer.chrome.com/extensions/getstarted
//updates https://developer.chrome.com/webstore/update
//storage api https://developer.chrome.com/docs/extensions/reference/api/storage#property-local

function log(a) {
  console.log({ msg: a, time: new Date(), service: "Whatsapp theme manager" })
}

const colors = {
  darkBg: "#161717",
  whiteTxt: "#ffffff99",
  whiteBg: "#ffffff",
  darkTxt: "#00000099",
}

const uiSelectors = {
  sidebarHead: ".x1280gxy",
  dialogTexts: "._asi6",
  chatMenu: ".x1o2sk6j",
  selectTexts: "selectable-text",
}

/**
 * Determines time bound for theme used from system.
 */
function isNightRule(currentHour) {
  return currentHour >= 20 || currentHour <= 7
}

/* 
	get the current time and populate tool bar menu
	...need to set this .nextSwitchTime in DOM to avoid log missing element error	
	*/
var time = new Date()
let currentHour = time.getHours()
if (isNightRule(currentHour)) {
  if (document.getElementById("nextSwitchTime")) document.getElementById("nextSwitchTime").innerHTML = "Light mode begins at 7am"
} else {
  if (document.getElementById("nextSwitchTime")) document.getElementById("nextSwitchTime").innerHTML = "Dark mode begins at 8pm"
}

function darkTheme({ msg = "" }) {
  document.body.classList.add("dark")
  localStorage.setItem("theme", '"dark"')
  document.querySelectorAll(uiSelectors.sidebarHead).forEach((node) => {
    node.style.backgroundColor = colors.darkBg
  })
  Array.from(document.getElementsByTagName("header")).forEach((node) => {
    node.style.backgroundColor = colors.darkBg
  })
  document.querySelectorAll(`${uiSelectors.chatMenu}, ${uiSelectors.selectTexts}, ${uiSelectors.dialogTexts}`).forEach((node) => {
    node.style.color = colors.whiteTxt
  })
  log(msg)
}

function lightTheme({ msg = "" }) {
  document.body.classList.remove("dark")
  localStorage.setItem("theme", '"light"')
  document.querySelectorAll(uiSelectors.sidebarHead).forEach((node) => {
    node.style.backgroundColor = colors.whiteBg
  })
  Array.from(document.getElementsByTagName("header")).forEach((node) => {
    node.style.backgroundColor = colors.whiteBg
  })
  document.querySelectorAll(`${uiSelectors.selectTexts}, ${uiSelectors.dialogTexts}, ${uiSelectors.chatMenu}`).forEach((node) => {
    node.style.color = colors.darkTxt
  })
  log(msg)
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
        darkTheme({ msg: `Dark mode triggered at ${time}` })
      }
    }
    //This changes to light mode from 8pm to 7am
    else {
      //check for manual override
      if (checkOverride == "web dark flaba" || checkOverride == "web flaba") {
        //do not change theme if class was light or not
        log("Cannot change theme after manual override")
      } else {
        lightTheme({ msg: `Light mode triggered at ${time}` })
      }
    }
  }

  //req defined, must be manual override
  else {
    let manualTheme = req.manual || "system"
    chrome.storage.sync.set({ manualTheme }).then(() => {
      log(`current theme manually set to ${manualTheme}`)
    })
    if (req.manual == "startLight") {
      lightTheme({ msg: `Light mode manually triggered at ${stampTime}` })
      //we need a reload to be perfect but not sure if this would impact the UX in a bad way
      // location.reload()
    } else if (req.manual == "startDark") {
      darkTheme({ msg: `Dark mode manually triggered at ${stampTime}` })
      //we need a reload to be perfect but not sure if this would impact the UX in a bad way
      // location.reload()
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
    darkTheme({ msg: `Reset to Dark mode as at ${currentHour}hr` })
  } else {
    lightTheme({ msg: `Reset to Light mode as at ${currentHour}hr` })
  }
}

//listen: change to proper theme when user clicks app
window.addEventListener("click", function () {
  chrome.storage.sync.get(["manualTheme"]).then((result) => {
    const { manualTheme } = result
    if (!manualTheme || !["startDark", "startLight"].includes(manualTheme)) return switchTheme()
  })
})

// button: start dark mode manually
if (document.getElementById("startDark"))
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
if (document.getElementById("startLight"))
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
if (document.getElementById("resetThemes"))
  document.getElementById("resetThemes").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: resetTheme,
      })
    })
  })
