//https://github.com/chrisenitan/Whave
//https://developer.chrome.com/extensions/getstarted

/*
to fix the reset issue:
it turns oiut if user had dark mode, we check if flaba was set and if they were trying to set dark mode, we dont set it cus we found flaba even though it will not matter 
but it will matter if they were trying to set to dark after overrideing light. then we will find flaba and we will not be able to swicth back to dark at night. 

okay cus this meand the buttons become hard lined forevrr. 
we should find a way tell the user about this behaviour
...then give them a button to refresh overrides. 
this button will check the time of the day and reset the class to light or dark based on that and allow them do normal swithc according to time from now on. 

...all these for this iteration. ideally we should be making sure they can choose to eirthet override permannent or contiue tomorrow in the forst place 

*/
let switchTheme = (req) =>{
//local var because we need this to be refreshed each time

	//get the current time
	var time = new Date();
	var hour = time.getHours();
	var stampTime = `${hour}:${time.getMinutes()}`;

	//req is defined: try to set according to the requested time
    if(req == undefined){
		var checkOverride =  document.querySelector(".web").getAttribute("class")
        //This changes to dark mode from 8pm to 7am
        if(hour >= 20 || hour <= 7){
			//check for manual override
			if(checkOverride == "web flaba"){
				//do not change theme
				console.log("Cannot change theme after manual override");
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
				console.log("Cannot change theme after manual override");
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
    var time = new Date();
    let currentHour = time.getHours();    
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

    
    
       
    
    
    
    
    
    
    
        
    