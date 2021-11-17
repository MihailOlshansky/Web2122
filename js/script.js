window.onload = function() {
	menue_current_page()
	show_load_time()
}

function show_load_time() {
	let loadTime = 
        window.performance.timing.domContentLoadedEventEnd 
        - window.performance.timing.navigationStart

    let p = document.createElement("p")
	let text = document.createTextNode("Load time " + loadTime / 1000 + " seconds")
	p.appendChild(text)

    let footer = document.getElementById("footer")
	footer.appendChild(p)
}

function menue_current_page(){
    let pages = ["index", "about_me", "my_programming"]
    let filename =
        new RegExp("/([A-Za-z0-9_]+)\.html")
            .exec(document.location.href)[1]
    
    let navigations = document.querySelectorAll(".navigation")
    navigations[pages.indexOf(filename)].className += " current_page"
}