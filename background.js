var FbTabsId = [];
var Timer = 0;
var Start = 0;
var End = 0;
var isNotStarted = true;

function setTime(isRequest = false){
	if(!End && Start){
		End = new Date().getTime();
		Timer += (End - Start);
	}
	if(isRequest && !isNotStarted)
		Start = new Date().getTime();
	else
		Start = 0;
	End = 0;
}

chrome.tabs.onActivated.addListener(function(activeInfo) {

	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

		if(tabs[0].url.search("facebook.com") != -1){
			if(FbTabsId.indexOf(activeInfo.tabId) == -1){
				FbTabsId.push(activeInfo.tabId);	
				console.log("Added new FacebookId!");
				chrome.tabs.executeScript(null,{code: 'document.body.style.backgroundColor="red"' });
			}

			if (FbTabsId.indexOf(activeInfo.tabId) != -1 && isNotStarted){
				isNotStarted = false;
				Start = new Date().getTime();
			}		
		}
		else if(!isNotStarted){
			setTime();
			console.log("TabSwitch: " + Timer);
			isNotStarted = true;
		}
	});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		setTime(true);
		
		console.log(request + ": " + Timer);

		sendResponse(Timer);
		
	}
);






// var FbExtension = {
// 	totalSecounds: 0,
// 	lastTimestamp: 0,
// 	list: null,
// 	link: null,
// 	initiate: function() {
// 		// this.list = document.createElement('li');
// 		// this.list.className = "_2s25";
// 		this.link = document.createElement('a');
// 		this.link.className = "_2s25";

// 		this.link.href = "#";
// 		this.link.innerHTML = 'wait..';
// 		// this.list.appendChild(this.link);

// 		var fbList;
// 		var tinyman;
// 		if( (fbList = document.getElementsByClassName('_1k67 _cy7')[0]) )
// 			tinyman = fbList.firstChild;
// 			fbList.insertBefore(this.link, tinyman);
//                         // fbList.insertBefore(this.list, tinyman);

// 		chrome.extension.sendMessage({action: 'load'}, this.loaded.bind(this));
// 	},
// 	loaded: function(data) {
// 		console.log('data recieved');
// 		console.log(data);

// 		this.totalSecounds = data.secounds || 0;
// 		this.lastTimestamp = data.date || this.getTimestamp();

// 		this.track();
// 		window.setInterval(FbExtension.track.bind(FbExtension), 1000);
// 		window.addEventListener('unload', FbExtension.onWindowClose.bind(FbExtension), false);
// 	},
// 	track: function() {
// 		var currentTimestamp;

// 		if( (currentTimestamp = this.getTimestamp()) != this.lastTimestamp ) {
// 			this.totalSecounds = 0;
// 		}

// 		this.totalSecounds++;
// 		this.lastTimestamp = currentTimestamp;
// 		this.update();
// 	},
// 	update: function() {
// 		var hours,minutes,secounds;

// 		hours = Math.floor(this.totalSecounds / 3600);
// 		minutes = Math.floor( (this.totalSecounds - hours*3600) / 60 );
// 		secounds = this.totalSecounds - minutes*60 - hours*3600;

// 		if( hours < 10 ) hours = "0"+hours;
// 		if( minutes < 10 ) minutes = "0"+minutes;
// 		if( secounds < 10 ) secounds = "0"+secounds;

// 		this.link.innerHTML = hours+":"+minutes+":"+secounds;
// 	},
// 	getTimestamp: function() {
// 		var d = new Date();
// 		return [
// 			d.getFullYear(),
// 			(d.getMonth() + 1 < 10 ? "0" + (d.getMonth()+1) : (d.getMonth()+1)),
// 			(d.getDate() < 10 ? "0"+d.getDate() : d.getDate())
// 		].join('');
// 	},
// 	onWindowClose: function() {
// 		chrome.extension.sendMessage({action: 'save', secounds: this.totalSecounds, date: this.lastTimestamp});
// 	}
// };
// FbExtension.initiate();
