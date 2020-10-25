//https://github.com/chrisenitan/Whave
//https://developer.chrome.com/extensions/getstarted


/* bug solution:
if click was on whatsapp normal, add nothing extra to class
else if it was on toolbar then add flaba and dark or noting and flaba
then make sure you checkwen click is on whatsapp, check for if flaba was added, if so, then dont over ride. 

for now user will have to refresh page to fix that behaviour though, or we add a refresh button later for this...
 */
let switchTheme = (req) =>{

	//get the current time
	var time = new Date();
	var hour = time.getHours();
	var stampTime = `${hour}:${time.getMinutes()}`;

    if(req == undefined){
        //This changes to dark mode from 8pm to 7am
        if(hour >= 20 || hour <= 7){
        document.querySelector(".web").setAttribute("class", "web dark");
        console.log(`Dark mode triggered at ${stampTime}`);
        }
        else{
        document.querySelector(".web").setAttribute("class", "web");
        console.log(`Light mode triggered at ${stampTime}`);
        }
    }
    else{
       if (req.manual == "startLight") {
		document.querySelector(".web").setAttribute("class", "web");
		console.log(`Light mode manually triggered at ${stampTime}`);
	   }
	   else if(req.manual == "startDark"){
		document.querySelector(".web").setAttribute("class", "web dark");
		console.log(`Dark mode manually triggered at ${stampTime}`);
	   }
	   else{
		   //this should not happen for now
	   }
    }	
    }
    
    //attach function to DOM
    window.addEventListener("click", function() {
    switchTheme()
    });  
	
	/* 
	get the current time
	..need to set this .nextSwitchTime in DOM	
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
   document.getElementById('nextSwitch').addEventListener("click", function(){
    
        //considered using declarativeContent but no idea how sync works yet
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: `switchTheme("test")`});
          });
    
    }) */
    
    
    //start dark mode
    document.getElementById('startDark').addEventListener("click", function(){
    
        //considered using declarativeContent but no idea how sync works yet
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
				{code: `
				var req = {
					manual:"startDark"
				}
				switchTheme(req)
				`});
          });
    
    })
	

    //start light mode
    document.getElementById('startLight').addEventListener("click", function(){
    
        //considered using declarativeContent but no idea how sync works yet
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
				{code: `
				var req = {
					manual:"startLight"
				}
				switchTheme(req)
				`});
          });
    
    })

    
    
       
    
    
    
    
    
    
    
        
    