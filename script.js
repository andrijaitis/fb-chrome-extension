

document.body.onload = function() {
	chrome.runtime.sendMessage(
		"GetFbTime", 
		(response) => {
			var Timer = "";
			var Hours = 0, Minutes = 0, Seconds = 0;
			var Time = response;
			Time /= 1000;
			if(Time >= 3600){
				Hours = parseInt(Time / 3600);
				Time %= (3600 * Hours);
				Timer += (Hours + "h ");
			}
			if(Time >= 60){
				Minutes = parseInt(Time / 60);
				Time %= (60 * Minutes);
				Timer += (Minutes + "m ");
			}
			Seconds = parseInt(Time);
			Timer += (Seconds + "s");
			if (Timer >= 5000){
				document.getElementById('Timer').innerHTML = Timer;
				chrome.tabs.executeScript(null,{code: 'document.body.style.backgroundColor="blue"' });
		
			} else {
				document.getElementById('MessagetoMofo').innerHTML = 'Get back to work mofo!!!!';
				document.getElementById('Timer').innerHTML = Timer;
		
				chrome.tabs.executeScript(null,{code: 'document.body.style.backgroundColor="blue"' });
			}

		}
	);
}