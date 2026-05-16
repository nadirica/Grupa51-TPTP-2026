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

const cardsSection = document.querySelector(".cards");

if (cardsSection && window.location.pathname.includes("index")) {
    const stats = document.createElement("div");
    stats.classList.add("statistics");
    document.querySelector("main").prepend(stats);

    function updateStatistics() {
        const visibleCards = document.querySelectorAll(
            '.card[style="display: block;"], .card:not([style])'
        );

        /* AI pomoć:
           Ova linija za pronalaženje vidljivih kartica
           napravljena je uz pomoć ChatGPT-a.
           Razumijem da:
           - [style="display: block;"] pronalazi prikazane kartice
           - :not([style]) pronalazi kartice bez style atributa
        */

        stats.innerHTML =
            "Broj prikazanih destinacija: " +
            visibleCards.length;
    }
    updateStatistics();
    window.updateStatistics = updateStatistics;
}

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

if (galleryHeading) {
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

}

const form = document.getElementById("contactForm");

if (form) {

    const ime = document.getElementById("ime");
    const prezime = document.getElementById("prezime");
    const email = document.getElementById("email");
    const telefon = document.getElementById("telefon");
    const tema = document.getElementById("tema");
    const poruka = document.getElementById("poruka");
    const successMessage = document.getElementById("successMessage");
    ime.value = localStorage.getItem("ime") || "";
    prezime.value = localStorage.getItem("prezime") || "";
    email.value = localStorage.getItem("email") || "";
    telefon.value = localStorage.getItem("telefon") || "";
    tema.value = localStorage.getItem("tema") || "";
    poruka.value = localStorage.getItem("poruka") || "";

    /* AI pomoć: Regex validacija za email i telefon
   napravljena je uz pomoć ChatGPT-a.

   Razumijem da:
   - ^ označava početak unosa
   - [^\s@]+ znači jedan ili više znakova osim razmaka i @
   - @ predstavlja obavezni znak u email adresi
   - \. označava tačku prije domene
   - $ označava kraj unosa

   Kod telefonskog regex-a:
   - [0-9+\-\s]+ dozvoljava brojeve,
     znak +, crticu i razmake. */
     
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s]+$/;

    const lastUser = localStorage.getItem("lastUser");
    if (lastUser && ime) {
        localStorage.setItem("ime", ime.value);
        localStorage.setItem("prezime", prezime.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("telefon", telefon.value);
        localStorage.setItem("tema", tema.value);
        localStorage.setItem("poruka", poruka.value);
    }

    function showError(input, message) {
        const error = input.parentElement.querySelector(".error-message");
        input.classList.add("input-error");
        error.innerText = message;
    }

    function clearError(input) {
        const error = input.parentElement.querySelector(".error-message");
        input.classList.remove("input-error");
        error.innerText = "";
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        if (ime.value.trim() === "") {
            showError(ime, "Unesite ime");
            valid = false;
        } else {
            clearError(ime);
        }

        if (prezime.value.trim() === "") {
            showError(prezime, "Unesite prezime");
            valid = false;
        } else {
            clearError(prezime);
        }

        if (!emailRegex.test(email.value)) {
            showError(email, "Email nije ispravan");
            valid = false;
        } else {
            clearError(email);
        }

        if (!phoneRegex.test(telefon.value)) {
            showError(telefon, "Telefon nije ispravan");
            valid = false;
        } else {
            clearError(telefon);
        }

        if (tema.value === "") {
            showError(tema, "Odaberite temu");
            valid = false;
        } else {
            clearError(tema);
        }

        if (poruka.value.trim().length < 10) {
            showError(poruka, "Poruka mora imati najmanje 10 karaktera");
            valid = false;
        } else {
            clearError(poruka);
        }

        if (valid) {
            localStorage.setItem("lastUser", ime.value);
            const userName = ime.value;
            
            successMessage.innerHTML = `
            <div class="success-message">
            Hvala ${userName}, vaša poruka je uspješno poslana.
            </div>
            `;

            setTimeout(() => {
                form.reset();
            }, 100);
        }
    });

    form.addEventListener("reset", function() {

    document
        .querySelectorAll(".error-message")
        .forEach(error => {
            error.innerText = "";
        });

    document
        .querySelectorAll(".input-error")
        .forEach(input => {
            input.classList.remove("input-error");
        });

    });
}