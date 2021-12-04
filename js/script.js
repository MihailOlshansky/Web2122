const startTime = Date.now()

window.onload = function() {
	menue_current_page()
	show_load_time()
}

function show_load_time() {
    let endTime = Date.now();
	let loadTime = endTime - startTime;
        

    let p = document.createElement("p")
	let text = document.createTextNode("Load time " + loadTime / 1000 + " seconds")
	p.appendChild(text)

    let footer = document.getElementById("footer")
	footer.appendChild(p)
}

function menue_current_page(){
    let titles = ["Ольшанский Михаил M33021", "Ольшанский Михаил M33021 - О себе", "Ольшанский Михаил M33021 - Мои навыки"]
    
    let navigations = document.querySelectorAll(".navigation")
    navigations[titles.indexOf(document.getElementsByTagName('title')[0].innerText)].className += " current_page"
}