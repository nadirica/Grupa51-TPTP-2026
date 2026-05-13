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


const footer = document.querySelector("footer");
const timeInfo = document.createElement("p");

function updateTime() {
const now = new Date();
timeInfo.innerHTML =
"Trenutno vrijeme: " +
now.toLocaleDateString("bs-BA") +
" | " +
now.toLocaleTimeString("bs-BA");
}

updateTime();
setInterval(updateTime, 1000);
footer.appendChild(timeInfo);

const tableRows = document.querySelectorAll("table tr");

tableRows.forEach(row => {

row.addEventListener("mouseenter", () => {
row.style.transition = "0.3s";
row.style.transform = "scale(1.01)";
});

row.addEventListener("mouseleave", () => {
row.style.transform = "scale(1)";
});

});

const galleryCards = document.querySelectorAll("#galerija .card");

galleryCards.forEach(card => {
card.addEventListener("click", () => {
card.style.transition = "1.5s";
card.style.transform = "scale(1.5)";
setTimeout(() => {
card.style.transform = "scale(1)";
}, 300);
});
});

const sections = document.querySelectorAll("main section");

/* AI pomoć: IntersectionObserver je pronadjen uz pomoć ChatGPT-a.

Razumijem da:
- IntersectionObserver prati kada element postane vidljiv na ekranu. */

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";
}
});
}, {
threshold: 0.2
});

sections.forEach(section => {
section.style.opacity = "0";
section.style.transform = "translateY(40px)";
section.style.transition = "all 0.8s ease";
observer.observe(section);
});

const galleryHeading = document.querySelector("#lista h2");
const colors = [
"#6134b6",
"#e67c25",
"#e940b6"
];

setInterval(() => {
const randomColor =
colors[Math.floor(Math.random() * colors.length)];
galleryHeading.style.transition = "0.5s";
galleryHeading.style.color = randomColor;
}, 2000);