function loadDOM() {

    const trailers = document.querySelectorAll(".trailer-source")

    if (trailers.length > 0) {
        const trailerWrapper = document.querySelector(".trailer-wrapper")
        const video = document.querySelector(".video")
        // Open Video
        trailers.forEach(trailer => {
            trailer.addEventListener("click", (event) => {
                // Cancle a tag action
                event.preventDefault();

                video.src = trailer.href + "?autoplay=1"
                trailerWrapper.classList.toggle("show")
            })
        })

        // Close Video when click out
        trailerWrapper.addEventListener("click", (event) => {
            if (!video.contains(event.target)) {
                trailerWrapper.classList.remove("show")
                video.src = "";
            }
        })
    }

    const searchBtn = document.querySelector(".search-btn")
    const searchWrapper = document.querySelector("#search")
    const searchInput = searchWrapper.querySelector(".search-box")

    // Open search box
    searchBtn.addEventListener("click", (event) => {
        // Cancle a tag action
        event.preventDefault()
        searchWrapper.classList.toggle("show")
    })

    // Close search box when click out
    searchWrapper.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target)) {
            searchWrapper.classList.remove("show")
        }
    })

    const scrollToTop = document.querySelector("#to-top-btn")
    // Scroll to top the website when click
    scrollToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    const accordions = document.querySelectorAll(".accordion-header");

    accordions.forEach((accordion, index) => {
        // Set first accordion is active
        if (index == 0) {
            let panel = accordion.nextElementSibling
            panel.style.maxHeight = panel.scrollHeight + "px"
        }

        accordion.addEventListener("click", function () {
            console.log(this.classList.toggle("active"));
            var panel = this.nextElementSibling
            if (panel.style.maxHeight) {
                this.classList.remove("active")
                panel.style.maxHeight = null
            } else {
                clearAccordianState()
                this.classList.add("active")
                panel.style.maxHeight = panel.scrollHeight + "px"
            }
        })

    })

    // Close accordion which is active
    function clearAccordianState() {
        accordions.forEach(accordion => {
            accordion.classList.remove("active")
            accordion.nextElementSibling.style.maxHeight = null;
        })
    }

    window.addEventListener("scroll", function () {
        const navbar = document.querySelector("#navbar")
        const toTopBtn = document.querySelector("#to-top-btn")
        const liveMovieSection = document.querySelector("#live-movie")

        // Show navbar when scroll down
        if (this.scrollY >= 200) {
            navbar.classList.add("scroll-down")
            toTopBtn.classList.add("show")
        } else {
            navbar.classList.remove("scroll-down")
            toTopBtn.classList.remove("show")
        }

        // Trigger animation when scroll to live-movie section
        if (liveMovieSection) {
            if (liveMovieSection.offsetTop - this.scrollY <= 300) {
                liveMovieSection.classList.add("trigger")
            }
        }
    })

}

// Load html
function includeHTML() {
    var z, i, elmnt, file, xhttp;

    z = document.getElementsByClassName("root-inner");
    console.log(z.length);
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];

        file = elmnt.getAttribute("load-html");

        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("load-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();

            return;
        }
    }
    loadDOM();
}