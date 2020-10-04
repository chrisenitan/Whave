/*
https://github.com/chrisenitan/Whave
*/

window.addEventListener("click", function() {

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
	console.log(`Dark mode not triggered. Tried at ${stampTime}`);
	}	

});  

//get the current time 
var time = new Date();
let currentHour = time.getHours(); 

if(currentHour < 20){
	var nextSwitchHour = 20 - currentHour
}
else{
	var nextSwitchHour = currentHour - 31
}
if(nextSwitchHour == 1){var hourEn = "hour"}else{var hourEn = "hours"}

document.getElementById('nextSwitchTime').innerHTML=`${nextSwitchHour}${hourEn}`;





	
