//https://github.com/chrisenitan/Whave


let switchTheme = (req) =>{

if(req != undefined){console.log(req)}

		//get the current time 
		var time = new Date();
		let hour = time.getHours(); 
		let stampTime = `${hour}:${time.getMinutes()}`;
	
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


window.addEventListener("click", function() {

switchTheme()

});  

//get the current time 
var time = new Date();
let currentHour = time.getHours(); 

if(currentHour >= 20 || currentHour <= 7){
	document.getElementById('nextSwitchTime').innerHTML="Light mode will begin at 7am";
}
else{
	document.getElementById('nextSwitchTime').innerHTML="Dark mode will begin at 8pm";
}

document.getElementById('nextSwitch').addEventListener("click", function(){

	//considered using declarativeContent but no idea how sync works yet
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'switchTheme()'});
	  });

})



   







	
