/****************************************
andrewyaros.com - javascript for homepage
By Andrew Yaros
For changing themes and the iframe source 
****************************************/

//IMPORTANT keep track of the current theme
var isDark = false;

//sun and moon button SVG icons
var moonIcon = '<svg id="themetoggletag" width="16" height="16" viewBox="0 0 16 16"><path id="themetoggleicon" d="M13.84,9.75a6,6,0,0,1-5.8,4.039A5.8,5.8,0,0,1,2.16,7.977,5.961,5.961,0,0,1,6.246,2.211a5.829,5.829,0,0,0-.57,2.726,5.19,5.19,0,0,0,5.414,5.384A6.052,6.052,0,0,0,13.84,9.75Z"/></svg>';

var sunIcon = '<svg id="themetoggletag" width="16" height="16" viewBox="0 0 16 16"><path id="themetoggleicon" d="M.669,7.792H3.646v.4H.669Zm2,5.25,2.1-2.112.288.288-2.1,2.1ZM2.958,2.67l2.113,2.1-.288.288-2.1-2.1ZM11.329,8A3.329,3.329,0,1,1,8,4.671,3.327,3.327,0,0,1,11.329,8ZM7.792,15.331V12.354h.4v2.977ZM8.208.669V3.646h-.4V.669ZM13.043,13.33l-2.114-2.1.289-.288,2.1,2.1Zm.288-10.372-2.1,2.113-.288-.288,2.1-2.1Zm2,5.25H12.354v-.4h2.977Z"/></svg>';

/*	Original unicode icons for buttons: 
	&#9728; sun		&#9790; moon 	&#9993; mail	*/

//change the theme to a different css file
//must be in the styles folder
//will be appended to the head tag as an additional link tag
function changeTheme(cssname) {
	//create a new link element, set it's attributes
	var newTheme = document.createElement("link");
	newTheme.setAttribute("type", "text/css");
	newTheme.setAttribute("rel", "stylesheet");
	newTheme.setAttribute("href", "./media/styles/" + cssname + ".css");
	//append to the head tag
	document.getElementsByTagName("head")[0].appendChild(newTheme);
}

//toggle back and forth between light and dark themes
function toggleTheme() {
	if(isDark) { //if dark then switch to light theme
		isDark = false;
		changeTheme("lighterColors");
		document.getElementById("changethemebutton").innerHTML = moonIcon;
	} else { //if light then switch to dark theme
		isDark = true;
		changeTheme("darkerColors");
		document.getElementById("changethemebutton").innerHTML = sunIcon;
	}
}

//change the iframe to a specfic URL
function changeDisplay(url) {
	document.getElementById("iframeDisplay").setAttribute("src", url);
	//document.getElementById("iframeButton").style.display = "none";
	/*
	if(invert && isDark) { //invert background if dark theme, and only if we want to invert
		document.getElementById("iframeDisplay").contentDocument.body.style.filter = "invert()";
	}
	*/
}

//reset the iframe to the slideshow
function resetDisplay() {
	changeDisplay("./media/slides/slides.html"); //set to main slideshow
	//document.getElementById("iframeButton").style.display = "block"; //show iframe button
	////disable invert filter
	////document.getElementById("iframeDisplay").contentDocument.body.style.filter = "none";
}