/************************
 * JavaScript for index *
 * page by Andrew Yaros *
 ************************/

//IMPORTANT keep track of the current theme
var isDark = false;

//sun and moon button SVG icons
var moonIcon = '<svg id="themetoggletag" width="16" height="16" viewBox="0 0 16 16"><path id="themetoggleicon" d="M13.84,9.75a6,6,0,0,1-5.8,4.039A5.8,5.8,0,0,1,2.16,7.977,5.961,5.961,0,0,1,6.246,2.211a5.829,5.829,0,0,0-.57,2.726,5.19,5.19,0,0,0,5.414,5.384A6.052,6.052,0,0,0,13.84,9.75Z"/></svg>';

var sunIcon = '<svg id="themetoggletag" width="16" height="16" viewBox="0 0 16 16"><path id="themetoggleicon" d="M.669,7.792H3.646v.4H.669Zm2,5.25,2.1-2.112.288.288-2.1,2.1ZM2.958,2.67l2.113,2.1-.288.288-2.1-2.1ZM11.329,8A3.329,3.329,0,1,1,8,4.671,3.327,3.327,0,0,1,11.329,8ZM7.792,15.331V12.354h.4v2.977ZM8.208.669V3.646h-.4V.669ZM13.043,13.33l-2.114-2.1.289-.288,2.1,2.1Zm.288-10.372-2.1,2.113-.288-.288,2.1-2.1Zm2,5.25H12.354v-.4h2.977Z"/></svg>';

/*	Original unicode icons for buttons: 
	&#9728; sun		&#9790; moon 	&#9993; mail	 */

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

//update the current copyright year
function updateDate() {
	//Change year to current year
	document.getElementById("currentDate").innerHTML = (new Date).getFullYear();
}

//change the inner shadow div to an image
function changeDisplay(imageName, shouldTile) {
	document.getElementById("innerDisplay").style.backgroundImage = "url('./media/slides/" + imageName + "')";
	
	if(shouldTile){
		document.getElementById("innerDisplay").style.backgroundRepeat = "repeat";
		document.getElementById("innerDisplay").style.backgroundSize = "auto";
	} else {
		document.getElementById("innerDisplay").style.backgroundRepeat = "no-repeat";
		document.getElementById("innerDisplay").style.backgroundSize = "cover";
	}
}

//reset the inner shadow div to no image
function resetDisplay() {
	//remove background image property from shadow div
	document.getElementById("innerDisplay").style.backgroundImage = "none";
}

//change the outer main content div
function setBackground(imageName) {
	document.getElementById("outerDisplay").style.backgroundImage = "url('" + imageName + "')";
}

//array with the names of each image
//images should be in the same directory as this html file
const slideNames = [
	"./media/slides/lancaster.jpg",
	"./media/slides/shell.jpg", 
	"./media/slides/wefa.jpg",
	"./media/slides/gropius.jpg",
	"./media/slides/barnes.jpg",
	"./media/slides/stanford.jpg"
]; const n = slideNames.length;

//array for slides used for mouseovers
const moreSlideNames = [
	"./media/slides/emailtile.gif",
	"./media/slides/githubtile.gif",
	"./media/slides/linkedintile.gif",
	"./media/slides/checkers.jpg",
	"./media/slides/resumeimage.jpg", 
	"./media/slides/foodtrucks.jpg"	
];

//change the slides every few seconds
const secondsInAMillisecond = 1000;
const numSec = 4; //number of seconds for slide to display
			
/* When the page is loaded: set the background image based on the current time
	create a date object; getTime returns Unix time, but milliseconds
	divide by 1000 and use floor function to get seconds
	to determine which slide to start off at, %n that number */
var unixTime = Math.floor((new Date).getTime()/secondsInAMillisecond);
var startingSlide = unixTime % n;

//preload images
var images = new Array();
/* Start preloading at the starting slide
Preload n images
*/
var currentSlideToPreload = startingSlide;
for (i = 0; i < n; i++) {
	images[currentSlideToPreload] = new Image();
	images[currentSlideToPreload].src = slideNames[currentSlideToPreload%n];
	currentSlideToPreload++; //increment index of slide; modulus n because we are looping over to the start
}

//load images for mouseovers
var moreImages = new Array();
for(i = 0; i < moreSlideNames.length; i++) {
	moreImages[i] = new Image();
	moreImages[i].src=moreSlideNames[i];
}

//counter variable starts at the second image; we already displayed the first
var count = startingSlide + 1;

//change the image to the next one
function changeSlide() { //change image to next item in array
	setBackground(slideNames[(count % n)]); count++;
}  setInterval(changeSlide, (secondsInAMillisecond * numSec));


/* VERY IMPORTANT - Do this stuff once page is loaded*/
window.onload = function initial() {
	//update copyright date
	updateDate();
	/* If it is dark out and dark theme isn't loaded, then load the dark theme ;) */
	var theHour = parseInt((new Date).getHours());
	if((theHour < 7 || theHour >= 19) && !isDark) toggleTheme();
	
	//inner div background should be blank
	resetDisplay();
	
	//set slideshow background
	setBackground(slideNames[startingSlide]);
}