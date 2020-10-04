/*

While we wait for WhatsApp to make the new theme feature change according to the time of the day and according to system settings.

This helps with that right from your browsers console.

Disclaimer: This is not a hack, if you do not know what's happening here, feel free to ask the closest developer to you for a review.

-- STEPS

1. Open your WhatsApp Web in a new tab and press `CMD + Option I` or `Ctrl I` or `F12` to access dev tools in your browser

2. Visit the console tab in your dev tools and paste the code below in and press enter.

3. Close Dev tools and enjoy your new dynamic WhatApp Web

- You'll have to repeat this process if you reload or close the tab.

*/


window.addEventListener("click", function() {

	//get the current time 
	var time = new Date();
	let check = time.getHours(); 
	let stamp = `${check}:${time.getMinutes()}`;
	//let lastTry = document.getElementById('lastTry');
	
	//check if the time is 8pm[20]: Feel free to change this to your tune.
	//This changes to dark mode from 8pm to 7am
	if(check >= 20 || check <= 7){
	document.querySelector(".web").setAttribute("class", "web dark");
	console.log(`Dark mode triggered at ${stamp}`);
	//lastTry.innerHTML=stamp;
	}
	else{
	document.querySelector(".web").setAttribute("class", "web");
	console.log(`Dark mode not triggered. Tried at ${stamp}`);
	//lastTry.innerHTML=stamp;
	}	

}); 


	//get the current time 
	var time = new Date();
	let check = time.getHours(); 
	let stamp = `${check}:${time.getMinutes()}`;
	let lastTry = document.getElementById('lastTry');
	lastTry.innerHTML=stamp;