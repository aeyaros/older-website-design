/************************
 * JavaScript for index *
 * page by Andrew Yaros *
 ************************/

/*************
 * VARIABLES *
 *************/

//for changing the slides every few seconds
const secondsInAMillisecond = 1000;
const numSec = 4; //number of seconds for slide to display
const secondsInAnHour = 3600000;
var hasTouchedYet = false;
const innerDisplayOpaque = "1"; //can be .5 or 1 or whatev
const innerDisplayTrans = "0"; //MUST BE ZERO!
//const noblur = "none";
//const blurred = "blur(20px)";

//variables for mouseover background tiles
//there are two arrays for tiles - one for light and one for dark
//depending on theme, these variables are set to ones for the light/dark tiles
var githubtile;
var linkedintile;
var emailtile;
var downtile;
var resumetile;
var checkerstile;
var painttile;
var trucktile;
var themetile;
//these are the variables which are used directly in the HTML file when changeDisplay is called!


//this is false by default
//this is used for toggling the theme
//this is changed when the page is done loading
var isDark = false;

//dont change theme automatically every hour if the user manually changes the theme
var userChangedTheme = false;

//sun and moon button SVG icons
const moonIcon = '<svg id="themetoggletag" width="16" height="16" viewBox="0 0 16 16"><path id="themetoggleicon" d="M13.84,9.75a6,6,0,0,1-5.8,4.039A5.8,5.8,0,0,1,2.16,7.977,5.961,5.961,0,0,1,6.246,2.211a5.829,5.829,0,0,0-.57,2.726,5.19,5.19,0,0,0,5.414,5.384A6.052,6.052,0,0,0,13.84,9.75Z"/></svg>';

const sunIcon = '<svg id="themetoggletag" width="16" height="16" viewBox="0 0 16 16"><path id="themetoggleicon" d="M.669,7.792H3.646v.4H.669Zm2,5.25,2.1-2.112.288.288-2.1,2.1ZM2.958,2.67l2.113,2.1-.288.288-2.1-2.1ZM11.329,8A3.329,3.329,0,1,1,8,4.671,3.327,3.327,0,0,1,11.329,8ZM7.792,15.331V12.354h.4v2.977ZM8.208.669V3.646h-.4V.669ZM13.043,13.33l-2.114-2.1.289-.288,2.1,2.1Zm.288-10.372-2.1,2.113-.288-.288,2.1-2.1Zm2,5.25H12.354v-.4h2.977Z"/></svg>';

/*	Original unicode icons for buttons: 
	&#9728; sun		&#9790; moon 	&#9993; mail	 */

//array with the names of each image
//images should be in the same directory as this html file
const slideNames = [
	"./media/slides/jpaint.jpg",
	"./media/slides/bshroom-l2.jpg",
	"./media/slides/lancaster.jpg",
	"./media/slides/shell.jpg", 
	"./media/slides/stanford.jpg",
	"./media/slides/wefa.jpg",
	"./media/slides/gropius.jpg",
	"./media/slides/barnes.jpg"
];

//n = number of slides
const n = slideNames.length;

/* When the page is loaded: set the background image based on the current time
	create a date object; getTime returns Unix time, but milliseconds
	divide by 1000 and use floor function to get seconds
	to determine which slide to start off at, %n that number */
var unixTime = Math.floor((new Date).getTime()/secondsInAMillisecond);
var startingSlide = unixTime % n;

//counter variable starts at the second image; we already displayed the first
var count = startingSlide + 1;

//arrays for tiles used for mouseovers
const tileNames1 = [
	/* light tiles */
	"./media/tiles/emailtile-light.gif",
	"./media/tiles/githubtile-light.gif",
	"./media/tiles/linkedintile-light.gif",
	"./media/tiles/downtile-light.gif",
	"./media/tiles/resumetile-light.gif",
	"./media/tiles/checkerstile-light.gif",
	"./media/tiles/painttile-light.gif",
	"./media/tiles/trucktile-light.gif",
	"./media/tiles/moontile-light.gif"
]; const tileNames2 = [
	/* dark tiles */
	"./media/tiles/emailtile-dark.gif",
	"./media/tiles/githubtile-dark.gif",
	"./media/tiles/linkedintile-dark.gif",
	"./media/tiles/downtile-dark.gif",
	"./media/tiles/resumetile-dark.gif",
	"./media/tiles/checkerstile-dark.gif",
	"./media/tiles/painttile-dark.gif",
	"./media/tiles/trucktile-dark.gif",
	"./media/tiles/suntile-dark.gif"
];

/*************
 * FUNCTIONS *
 *************/

/* IMPORTANT!
Set the outer display div to a transparent png file.
This will replace the "please enable javascript" image.
That way, when the page loads, the first slide will fade
in from a single color, rather than the javascript image,
which we don't ever want the user to see if javascript is 
enabled. I put this in a script tag so that it would load 
right after the outerDisplay tag is loaded. Note: the image 
file needs to be the same size as the slides to prevent weird
resizing/stretching effects on fade-in in certain browsers. */
function setTranslucentSlide() {
	document.getElementById("outerDisplay").style.backgroundImage = "url('./media/slides/transparent.png')";
}

//change the theme to a different css file
//must be in the styles folder
//will be appended to the head tag as an additional link tag
function appendCSS(cssname) {
	//create a new link element, set it's attributes
	let newTheme = document.createElement("link");
	newTheme.setAttribute("type", "text/css");
	newTheme.setAttribute("rel", "stylesheet");
	newTheme.setAttribute("href", "./media/styles/" + cssname + ".css");
	//append to the head tag
	document.getElementsByTagName("head")[0].appendChild(newTheme);
	console.log("dark = " + isDark);
}

//use dark theme
function makeDark() {
	isDark = true;
	appendCSS("darkerColors");
	document.getElementById("changethemebutton").innerHTML = sunIcon;
	githubtile = "githubtile-dark.gif";
	linkedintile = "linkedintile-dark.gif";
	emailtile = "emailtile-dark.gif";
	downtile = "downtile-dark.gif";
	resumetile = "resumetile-dark.gif";
	checkerstile = "checkerstile-dark.gif";
	painttile = "painttile-dark.gif";
	trucktile = "trucktile-dark.gif";
	themetile = "suntile-dark.gif";
}

//use light theme
function makeLight() {
	isDark = false;
	appendCSS("lighterColors");
	document.getElementById("changethemebutton").innerHTML = moonIcon;
	githubtile = "githubtile-light.gif";
	linkedintile = "linkedintile-light.gif";
	emailtile = "emailtile-light.gif";
	downtile = "downtile-light.gif";
	resumetile = "resumetile-light.gif";
	checkerstile = "checkerstile-light.gif";
	painttile = "painttile-light.gif";
	trucktile = "trucktile-light.gif";
	themetile = "moontile-light.gif";
}

//toggle theme; a user action
function toggleTheme() {
	if (isDark) makeLight();
	else makeDark();
	//user changed the theme, so this must be true now:
	userChangedTheme = true;
}

function toggleThemeAndRefresh() {
	toggleTheme();
	changeDisplay(themetile, true);
}

//change theme based on time
function setTheme() {
	let theHour = (new Date).getHours();
	if(theHour < 7 || theHour >= 19) makeDark();
	else makeLight();
}

//update the current copyright year
function updateDate() { //Change year to current year
	document.getElementById("currentDate").innerHTML = String((new Date).getFullYear());
}

//when email link is clicked
function sendEmail() {
	//subtract 1 from a character code to get the previous character
	function shiftDown(char) {
		return String.fromCharCode(char.charCodeAt(0) - 1);
	}

	//shift a whole word downwards
	function shiftWord(input) {
		let output = "";
		//shift each character in the word
		for (let i = 0; i < input.length; i++) output += (shiftDown(input[i]));
		return output;
	}

	let shifted = ["boesfx", "zbspt", "bf"];
	//go to mailto link
	window.location = "mailto:" + shiftWord(shifted[0]) + "@" + shiftWord(shifted[1]) + "." + shiftWord(shifted[2]);
}

//change the inner shadow div to an image
function changeDisplay(imageName, shouldTile) {
	//then, depending on the argument, either tile it or not
	if (shouldTile){
		document.getElementById("innerDisplay").style.backgroundImage = "url('./media/tiles/" + imageName + "')";
		document.getElementById("innerDisplay").style.backgroundRepeat = "repeat";
		document.getElementById("innerDisplay").style.backgroundSize = "auto";
	} else {
		document.getElementById("innerDisplay").style.backgroundImage = "url('./media/slides/" + imageName + "')";
		document.getElementById("innerDisplay").style.backgroundRepeat = "no-repeat";
		document.getElementById("innerDisplay").style.backgroundSize = "cover";
	}
	//finally, change the opacity, which triggers the fade-in transition
	//this is because in the CSS we are setting the transition time of the opacity property
	//changing the source should be done first, since the source change happens immediately
	//(user should never see an abrupt image change)
	document.getElementById("innerDisplay").style.opacity = innerDisplayOpaque;
	
	////blur the outer background
	////document.getElementById("bg").style.filter = blurred;
}

//reset the inner shadow div to no image
function resetDisplay() {
	//remove background image property from shadow div
	//reduce opacity - this will fade it out to trasnparent 
	//dont change the image, not necessary until the next time changeDisplay is called
	document.getElementById("innerDisplay").style.opacity = innerDisplayTrans;
	
	////unblur the outer background
	////document.getElementById("bg").style.filter = "none";
}

//change the outer main content div
function setBackground(imageName) {
	document.getElementById("bg").style.backgroundImage = "url('" + imageName + "')";
}

//change the image to the next one
function changeSlide() { //change image to next item in array
	setBackground(slideNames[(count % n)]); count++;
}

/* VERY IMPORTANT - Do this stuff once page is loaded*/
window.onload = function initial() {
	//update copyright date in HTML
	updateDate();
	
	//IMPORTANT!!!!!! Set the inner display div to a transparent png file as the default
	//that way, the first time we mouseover a footer link, we will get a smooth transition
	document.getElementById("innerDisplay").style.backgroundImage = "url('./media/slides/transparent.png')";
	
	// If it is dark out and dark theme isn't loaded, then load the dark theme ;) 
	setTheme();
	
	/* Yes, I know I'm loading the colors manually in the HTML,
		but I am still doing this here to ensure the button icons are changed,
		and as a matter of principle (this function *should* be called 
		if I change the theme) */
	
	//update the theme every so often, but only if user hasn't changed it
	setInterval(function () {
		//if user hasn't changed theme
		//then set it based on time
		if (!userChangedTheme) setTheme();
	}, secondsInAnHour);
	
	//add event listener to detect touch events
	//if user touches screen, disable mouseover colors on buttons
	window.addEventListener("touchstart", function() {
		if (!hasTouchedYet) { //if not touched yet
			appendCSS("mobileSupression"); //remove button highlighting
			hasTouchedYet = true; //set global variable
		}
	});
	
	//inner div background should be blank
	resetDisplay();	

	//preload images
	let images = [];
	/* Start preloading at the starting slide
	Preload n images */
	let currentSlideToPreload = startingSlide;
	for (let i = 0; i < n; i++) {
		images[currentSlideToPreload] = new Image();
		images[currentSlideToPreload].src = slideNames[currentSlideToPreload%n];
		currentSlideToPreload++; //increment index of slide; modulus n because we are looping over to the start
	}
	
	//set slideshow background
	setBackground(slideNames[startingSlide]);
	
	//preload images for mouseovers
	const moreImages1 = []; //light tiles
	const moreImages2 = []; //dark tiles
	
	if (isDark) { //if dark, first load dark tiles, then light
		for (let i = 0; i < tileNames2.length; i++) {
			moreImages2[i] = new Image();
			moreImages2[i].src = tileNames2[i];
		} for (let i = 0; i < tileNames1.length; i++) {
			moreImages1[i] = new Image();
			moreImages1[i].src = tileNames1[i];
		}
	} else { //otherwise load lighter tiles first
		for (let i = 0; i < tileNames1.length; i++) {
			moreImages1[i] = new Image();
			moreImages1[i].src = tileNames1[i];
		} for (let i = 0; i < tileNames2.length; i++) {
			moreImages2[i] = new Image();
			moreImages2[i].src = tileNames2[i];
		}
	}
	
	//change the slide every few seconds
	setInterval(changeSlide, (secondsInAMillisecond * numSec));
}
