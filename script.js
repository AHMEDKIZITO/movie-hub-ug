console.log("Welcome to Movie Hub UG!");

// ==================================
// 1. HOMEPAGE MOVIE SEARCH
// ==================================

const searchInput = document.getElementById("movieSearch");

if (searchInput) {
    const movieCards = document.querySelectorAll("#movieGrid .movie-card");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase().trim();

        movieCards.forEach(function (card) {
            const movieName = card.textContent.toLowerCase();

            card.style.display = movieName.includes(searchValue)
                ? ""
                : "none";
        });
    });
}


// ==================================
// 2. VJ MOVIE SEARCH AND FILTERS
// ==================================

const vjButtons = document.querySelectorAll(".vj-filter");
const vjCards = document.querySelectorAll("#vjMovieGrid .movie-card");
const vjSearch = document.getElementById("vjSearch");

let selectedVJ = "all";

function filterVJMovies() {
    const searchText = vjSearch
        ? vjSearch.value.toLowerCase().trim()
        : "";

    vjCards.forEach(function (card) {
        const cardVJ = card.dataset.vj;

        const matchesVJ =
            selectedVJ === "all" || cardVJ === selectedVJ;

        const matchesSearch =
            card.textContent.toLowerCase().includes(searchText);

        card.style.display =
            matchesVJ && matchesSearch ? "" : "none";
    });
}


// ==================================
// 3. VJ FILTER BUTTONS
// ==================================

vjButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        selectedVJ = button.dataset.vj;

        vjButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterVJMovies();
    });
});


// ==================================
// 4. VJ SEARCH BAR
// ==================================

if (vjSearch) {
    vjSearch.addEventListener("input", filterVJMovies);
}


// ==================================
// 5. CLICKABLE VJ PROFILE CARDS
// ==================================

const vjProfiles = document.querySelectorAll(".vj-profile-card");

vjProfiles.forEach(function (profile) {

    function chooseProfile() {
        selectedVJ = profile.dataset.vj;

        vjButtons.forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.vj === selectedVJ
            );
        });

        filterVJMovies();

        // Scroll down to the movie collections
        const collections = document.getElementById("vjMovieGrid");

        if (collections) {
            collections.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    profile.addEventListener("click", chooseProfile);

    profile.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            chooseProfile();
        }
    });

});

// ==================================
// 6. CLICKABLE MOVIE POSTERS
// ==================================

const allMovieCards = document.querySelectorAll(".movie-card");

allMovieCards.forEach(function (card) {

    card.style.cursor = "pointer";

    card.addEventListener("click", function () {

        const titleElement = card.querySelector("h3");

        if (!titleElement) {
            return;
        }

        const movieTitle = titleElement.textContent.trim();

        window.location.href =
            "movie-details.html?title=" +
            encodeURIComponent(movieTitle);

    });

});