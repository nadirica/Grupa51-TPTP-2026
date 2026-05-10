function filterSelection(category) {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else if (card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
    updateStatistics();
}

const darkModeButton = document.createElement("button");
darkModeButton.innerText = "🌙 Dark Mode";
darkModeButton.classList.add("dark-mode-btn");
document.body.appendChild(darkModeButton);


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    darkModeButton.innerText = "☀ Light Mode";
}

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        darkModeButton.innerText = "☀ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        darkModeButton.innerText = "🌙 Dark Mode";
    }
});

const stats = document.createElement("div");
stats.classList.add("statistics");
document.querySelector("main").prepend(stats);

function updateStatistics() {
    const visibleCards = document.querySelectorAll(
        '.card[style="display: block;"], .card:not([style])'
    );

     /* AI pomoć: Ova linija koda za pronalaženje vidljivih kartica 
     napravljena je uz pomoć ChatGPT-a. Razumijem da:
    - [style="display: block;"] pronalazi kartice koje su trenutno prikazane.
    - :not([style]) pronalazi kartice koje nemaju style atribut. */

    stats.innerHTML =
        "Broj prikazanih destinacija: " + visibleCards.length;
}

updateStatistics();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(
            this.getAttribute("href")
        );
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});