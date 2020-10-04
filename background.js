chrome.runtime.onInstalled.addListener(function() {

    console.log("The color is green.");

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'web.whatsapp.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
      
      
      
  });




/* 
  	//get the current time 
	var time = new Date();
	let check = time.getHours(); 
	let stamp = `${check}:${time.getMinutes()}`;

	lastTry.innerHTML=stamp;
 */

