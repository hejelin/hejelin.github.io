'use strict';

var projects;
var initialProjCount = 3;
var projectsContainer;

var jiggyID;

var slideElements;

var offsetTop;
var innerHeight;

var fullscreenEl;

var byes = ["G'bye",
			"Farewell",
			"So long",
			"Thanks for all the fish",
			"Hejdå",
			"Hare gött häj",
			"Live long and prosper",
			"May the force be with you",
			"Bye",
			"See ya",
			"Memento mori",
			"Later"];

window.onload = function() {
	getProjects();

	
	console.log(`
 ___            ___    ___                           ___  
(   )     .-.  (   )  (   )                         (   ) 
 | | .-. ( __)  | |_   | | .-.  .--. ___ .-.    .--. | |  
 | |/   \\(''") (   __) | |/   \\/    (   )   \\  /    \\| |  
 |  .-. . | |   | |    |  .-. |  .-. | ' .-. ;|  .-. | |  
 | |  | | | |   | | ___| |  | |  | | |  / (___|  | | | |  
 | |  | | | |   | |(   | |  | |  |/  | |      |  |/  | |  
 | |  | | | |   | | | || |  | |  ' _.| |      |  ' _.| |  
 | |  | | | |   | ' | || |  | |  .'.-| |      |  .'.-|_|  
 | |  | | | |   ' \`-' ;| |  | '  \`-' | |      '  \`-' .-.  
(___)(___(___)   \`.__.(___)(___\`.__.(___)      \`.__.(   ) 
                                                     '-'  
                                                          
Did you wanna look at my code? Well, feel free! You might find some fun stuff 👀`);


	document.getElementById("name").addEventListener(
		"click", 
		function() {
			var cont = this.innerHTML;
			this.innerHTML = cont;
		});

	innerHeight = window.innerHeight;
	offsetTop = window.scrollY;

	var bye = document.getElementById("bye");
	if (bye && byes) {
		bye.innerHTML = byes[Math.min(11, Math.round(Math.random() * byes.length))] + "! 🦄";
	}

	fullscreenEl = document.querySelector(".proj_fullscreen");

	slideElements = Array.prototype.slice.call(document.querySelectorAll(".slide"));
	slideIn();

	projectsContainer = document.querySelector("section#projects");
	var placeholder = projectsContainer.querySelector(".placeholder_proj");
	placeholder.style.height = 0;
	placeholder.addEventListener("transitionend", function() {
		projectsContainer.removeChild(placeholder);
	});
}

window.onscroll = function() {
	offsetTop = window.scrollY;
}

window.onresize = function() {
	innerHeight = window.innerHeight;
}

function getProjects() {
	var request = new XMLHttpRequest();
	request.open("GET", "projects.json", true);
	request.send(null);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200 ) {
			var data = JSON.parse(request.responseText);
			projects = data.projects;
			showSomeProjects(initialProjCount);
		}
	}
}

function showSomeProjects(some) {
	var count = some;

	randomizeProjects()


	for (var i = 0; i < count; i++) {
		var node = getProjectEl(
			projects[i].title, 
			projects[i].desc, 
			projects[i].img_url, 
			projects[i].tags, 
			projects[i].project_date,
			projects[i].url);

		projectsContainer.appendChild(node);
	}

	/**
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "SHOW ALL";
	btn.id = "project_btn";
	btn.classList.add("action_btn");
	btn.addEventListener('click', showAllProjects);
	projectsContainer.appendChild(btn); */
}

function showAllProjects() {
	var count = projects.length;
	for (var i = initialProjCount; i < count; i++) {
		var node = getProjectEl(
			projects[i].title, 
			projects[i].desc, 
			projects[i].img_url, 
			projects[i].tags, 
			projects[i].project_date,
			projects[i].url);

		projectsContainer.appendChild(node);
	}

	var btn = document.getElementById('project_btn');
	btn.parentNode.removeChild(btn);
}

function randomizeProjects() {
	// copy-pasted from Stackoverflow (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
	let currentIndex = projects.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[projects[currentIndex], projects[randomIndex]] = [
			projects[randomIndex], projects[currentIndex]];
	}
}

function getProjectEl(title, desc, img_url, tags, project_date, url) {
	var cont = document.createElement("DIV");
	cont.classList.add("proj", "slide");

	var proj_img = document.createElement("DIV");
	proj_img.classList.add("proj_img");
	proj_img.style.backgroundImage = "url(" + img_url + ")";
	proj_img.addEventListener("mousemove", function(e) {
		requestAnimationFrame(function() { proj_img.setAttribute("style", 
			"background-image: url(" + img_url + ");" + 
			"background-position-x: " + (- e.offsetX + proj_img.offsetWidth / 2) + "px;" + 
			"background-position-y: " + (- e.offsetY + proj_img.offsetHeight / 2) + "px;"
			);});
	});
	proj_img.addEventListener("click", function(e) {
		fullscreenEl.style.display = "block";
		fullscreenEl.style.backgroundImage = "url(" + img_url + ")";
		fullscreenEl.addEventListener(
		"click",
		function() {
			fullscreenEl.style.display = "none";
		});
	});


	var description = document.createElement("DIV");
	description.classList.add("proj_desc");
	
	var proj_title = document.createElement("H2");
	proj_title.classList.add("proj_title");
	proj_title.innerHTML = title;

	var proj_desc = document.createElement("P");
	proj_desc.innerHTML = desc;

	description.appendChild(proj_title);
	description.appendChild(proj_desc);

	if (url != null) {
		description.innerHTML += "<a href=\"" + url + "\" target=\"_blank\" class=\"button_link\">LINK</a>";
	}

	cont.appendChild(proj_img);
	cont.appendChild(description);

	slideElements.push(cont);

	return cont;
}

function slideIn() {
	// when I was younger, I thought I'd make this look really cool. It's probably not gonna happen
}

function getJiggyWithIt() {
	// Oh hi! Wondering what this one does? why don't you call
	// getJiggyWithIt() in the dev console and find out? 👀

	var elements = document.getElementsByTagName("*");
	var count = elements.length;

	for (var i = 0; i < count; i++) {
		var el = elements[i];
		var tag = el.tagName;
		if (tag != "BODY" && tag != "HTML" && tag != "SECTION" && tag != "HEADER") {
			el.style.transform = "rotate(" + (2 * Math.random() - 1) + "deg)";
		}
	}

	jiggyID = window.setTimeout(getJiggyWithIt, 100);
}

function stopGettingJiggyWithIt() {
	// if you get bored of the above function, you can end it by calling this one

	window.clearTimeout(jiggyID);
}

