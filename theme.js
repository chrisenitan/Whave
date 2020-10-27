//https://github.com/chrisenitan/Whave
//https://developer.chrome.com/extensions/getstarted


//get the current time
var time = new Date();
let currentHour = time.getHours();   
var stampTime = `${currentHour}:${time.getMinutes()}`;

let switchTheme = (req) =>{

	//req is defined: try to set according to the requested time
    if(req == undefined){
		var checkOverride =  document.querySelector(".web").getAttribute("class")
        //This changes to dark mode from 8pm to 7am
        if(currentHour >= 20 || currentHour <= 7){
			//check for manual override
			if(checkOverride == "web flaba"){
				//do not change theme
			}else{
				//change theme to darkmode
				document.querySelector(".web").setAttribute("class", "web dark");
				console.log(`Dark mode triggered at ${stampTime}`);
			}
		}
		//This changes to light mode from 8pm to 7am
        else{
			//check for manual override
			if(checkOverride == "web dark flaba"){
				//do not change theme
			}else{
				//change theme to light mode
				document.querySelector(".web").setAttribute("class", "web");
				console.log(`Light mode triggered at ${stampTime}`);
			}
        }
	}
	//no req defined, must be manual override
    else{
       if(req.manual == "startLight") {
		document.querySelector(".web").setAttribute("class", `web ${req.override}`);
		console.log(`Light mode manually triggered at ${stampTime}`);
	   }
	   else if(req.manual == "startDark"){
		document.querySelector(".web").setAttribute("class", `web dark ${req.override}`);
		console.log(`Dark mode manually triggered at ${stampTime}`);
	   }
	   else{
		   //this should not happen for now
	   }
    }	
    }
    
    //attach switchTheme function to DOM
    window.addEventListener("click", function() {
    switchTheme()
    });
	
	/* 
	get the current time and populate tool bar menu
	...need to set this .nextSwitchTime in DOM to avoid log missing element error	
	*/ 
    if(currentHour >= 20 || currentHour <= 7){
        document.getElementById('nextSwitchTime').innerHTML="Light mode begins at 7am";
    }
    else{
        document.getElementById('nextSwitchTime').innerHTML="Dark mode begins at 8pm";
    }
    
   /*
   //set a custom start and stop time
   document.getElementById('nextSwitch').addEventListener("click", function(){
    
        //considered using declarativeContent but no idea how sync works yet
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: `switchTheme("test")`});
          });
    
	}) 
	*/
    
    
    //start dark mode manually
    document.getElementById('startDark').addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
				{code: `
				var req = {
					manual:"startDark",
					override: "flaba"
				}
				switchTheme(req)
				`});
          });
    })
	

    //start light mode manually
    document.getElementById('startLight').addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
				{code: `
				var req = {
					manual:"startLight",
					override: "flaba"
				}
				switchTheme(req)
				`});
          });
    })

    
    
       
    
    
    
    
    
    
    
        
    