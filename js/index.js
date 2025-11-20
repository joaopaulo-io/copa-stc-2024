/* ----- Show Menu ----- */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Menu show
navToggle?.addEventListener("click", () => navMenu.classList.add("show-menu"));

// Menu hidden
navClose?.addEventListener("click", () =>
  navMenu.classList.remove("show-menu")
);

/* ----- Ativa e remove menu ----- */
const navLinks = document.querySelectorAll(".nav-link");

function linkAction() {
  // link ativo
  navLinks.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");

  // Remove menu mobile
  navMenu.classList.remove("show-menu");
}
navLinks.forEach((link) => link.addEventListener("click", linkAction));

/* ----- Highlights (Swiper via JSON) ----- */
const highlightsWrapper = document.querySelector(".card-content");

fetch("./json-files/highlights.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((game) => {
      const slide = document.createElement("article");
      slide.classList.add("highlights", "swiper-slide");

      slide.innerHTML = `
        <header class="highlights__header">
          <h2>${game.competicao}</h2>
          <p>${game.data} | ${game.hora} | ${game.local}</p>
        </header>

        <section class="game__teams">
          <figure class="teams__info">
            <img src="images/teams/${game.escudo_mandante}" alt="Escudo ${game.mandante}" />
            <figcaption><h5>${game.mandante}</h5></figcaption>
          </figure>

          <div class="scoreboard">
            <span class="score">${game.gols_mandante}</span>
            <span class="divider">X</span>
            <span class="score">${game.gols_visitante}</span>
          </div>

          <figure class="teams__info">
            <img src="images/teams/${game.escudo_visitante}" alt="Escudo ${game.visitante}" />
            <figcaption><h5>${game.visitante}</h5></figcaption>
          </figure>
        </section>

        <section class="match__details">
          <h6>Penaltis: ${game.penaltis}</h6>
          <h6>${game.descricao}</h6>
        </section>

        <footer class="highlights__footer">
          <a href="${game.link}" class="btn btn-primary">${game.link_text}</a>
        </footer>
      `;

      highlightsWrapper.appendChild(slide);
    });

    // Inicializa o Swiper APÓS criar os slides
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 3000, // 3 segundos entre slides
        disableOnInteraction: false, // Continua autoplay mesmo após interação
      },
      breakpoints: {
        1270: {
          slidesPerView: 2,
        },
      },
    });
  });

/* ----- Classification JS ----- */
const classificationTable = document.querySelector(".classification-table");
const classificationBodyRows = document.querySelectorAll(
  ".classification-body tr"
);
const groupLettersSelect = document.querySelector(".groupLetters");

function displayClassificationTable(groupLetter) {
  document.querySelector(".letter").textContent = groupLetter;

  fetch(`./json-files/group${groupLetter}.json`)
    .then((response) => response.json())
    .then((data) => {
      // Sort data by 'posicao'
      data.sort((a, b) => a.posicao - b.posicao);

      data.forEach((team, index) => {
        classificationBodyRows[index].innerHTML = `
                    <td>${team.posicao}</td>
                    <td>${team.equipe}</td>
                    <td>${team.pontos}</td>
                    <td>${team.jogos}</td>
                    <td>${team.vitorias}</td>
                    <td>${team.empates}</td>
                    <td>${team.derrotas}</td>
                    <td>${team.gols_pro}</td>
                    <td>${team.gols_contra}</td>
                    <td>${team.saldo_de_gols}</td>
                `;
      });
    });
}

// Inicializa exibindo o Grupo A
displayClassificationTable("A");

// Alterar grupo selecionado
groupLettersSelect.addEventListener("change", (e) =>
  displayClassificationTable(e.target.value)
);

/* ----- Phase 1 (JSON) ----- */
const matchesTable = document.querySelector(".matches-table");

fetch("./json-files/firstPhase.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((match) => {
      const matchRow = document.createElement("div");
      matchRow.classList.add("match-row");
      matchesTable.appendChild(matchRow);

      matchRow.innerHTML = `
    <div class="match">

      <header class="match-header">
        <h2>Copa do Interior 2024</h2>
        <p>${match.estadio} / ${match.diaSemana}</p>
        <time>${match.data} - ${match.hora}</h3>
      </header>

      <section class="match-teams">
        <figure class="team">
            <img src="images/teams/${match.escudo_mandante}" alt="Escudo ${match.equipe_mandante}">
            <figcaption class="team-name">${match.equipe_mandante}</figcaption>
        </figure>

        <div class="match-score"> 
            <span class="score">${match.gols_mandante}</span>
            <span class="divider">X</span>
            <span class="score">${match.gols_visitante}</span>
        </div>

        <figure class="team">
            <img src="images/teams/${match.escudo_visitante}" alt="Escudo ${match.equipe_visitante}">
            <figcaption class="team-name">${match.equipe_visitante}</figcaption>
        </figure>
      </section>

      <footer class="match__footer"> 
        <a href='#classification' class="btn" aria-label="Ver detalhes do grupo ${match.grupo}">Grupo ${match.grupo}</a>
      </footer>

    </div>
`;
    });
  });

/* ----- Quarter Finals (JSON) ----- */
const quarterFinalsContainer = document.getElementById(
  "quarterFinalsContainer"
);

fetch("./json-files/quarterFinals.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((game) => {
      const article = document.createElement("article");
      article.classList.add("match");

      article.innerHTML = `
        <header class="match-header">
          <h2>${game.titulo}</h2>
          <p>${game.estadio}</p>
          <time>${game.data} - ${game.hora}</time>
        </header>

        <ul class="match-teams">
          <li class="team">
            <img src="images/teams/${game.escudo_mandante}" alt="Escudo ${game.mandante}">
            <span class="team-name">${game.mandante}</span>
          </li>

          <li class="match-score">
            <span class="score">${game.gols_mandante}</span>
            <span class="divider">X</span>
            <span class="score">${game.gols_visitante}</span>
          </li>

          <li class="team">
            <img src="images/teams/${game.escudo_visitante}" alt="Escudo ${game.visitante}">
            <span class="team-name">${game.visitante}</span>
          </li>
        </ul>

        <dl class="match-info">
          <dt>Pênaltis:</dt>
          <dd>${game.penaltis}</dd>

          <dt>Placar Pênaltis:</dt>
          <dd>${game.placar_penaltis}</dd>

          <dt>Classificado:</dt>
          <dd>${game.classificado}</dd>
        </dl>

        <a href="#" class="btn btn-primary">${game.jogo}</a>
      `;

      quarterFinalsContainer.appendChild(article);
    });
  });

/* ----- Semi Finals (JSON) ----- */
const semiFinalsContainer = document.getElementById("semiFinalsContainer");

fetch("./json-files/semiFinals.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((game) => {
      const article = document.createElement("article");
      article.classList.add("match");

      article.innerHTML = `
        <header class="match-header">
          <h2>${game.titulo}</h2>
          <p>${game.estadio}</p>
          <time>${game.data} - ${game.hora}</time>
        </header>

        <ul class="match-teams">
          <li class="team">
            <img src="images/teams/${game.escudo_mandante}" alt="Escudo ${game.mandante}">
            <span class="team-name">${game.mandante}</span>
          </li>

          <li class="match-score">
            <span class="score">${game.gols_mandante}</span>
            <span class="divider">X</span>
            <span class="score">${game.gols_visitante}</span>
          </li>

          <li class="team">
            <img src="images/teams/${game.escudo_visitante}" alt="Escudo ${game.visitante}">
            <span class="team-name">${game.visitante}</span>
          </li>
        </ul>

        <dl class="match-info">
          <dt>Pênaltis:</dt>
          <dd>${game.penaltis}</dd>

          <dt>Placar Pênaltis:</dt>
          <dd>${game.placar_penaltis}</dd>

          <dt>Classificado:</dt>
          <dd>${game.classificado}</dd>
        </dl>

        <a href="#" class="btn btn-primary">${game.jogo}</a>
      `;

      semiFinalsContainer.appendChild(article);
    });
  });

/* ----- Final (JSON) ----- */
const finalContainer = document.getElementById("finalContainer");

fetch("./json-files/final.json")
  .then((res) => res.json())
  .then((game) => {
    const article = document.createElement("article");
    article.classList.add("match");

    article.innerHTML = `
      <header class="match-header">
        <h2>${game.titulo}</h2>
        <p>${game.estadio}</p>
        <time>${game.data} - ${game.hora}</time>
      </header>

      <ul class="match-teams">
        <li class="team">
          <img src="images/teams/${game.escudo_mandante}" alt="Escudo ${game.mandante}">
          <span class="team-name">${game.mandante}</span>
        </li>

        <li class="match-score">
          <span class="score">${game.gols_mandante}</span>
          <span class="divider">X</span>
          <span class="score">${game.gols_visitante}</span>
        </li>

        <li class="team">
          <img src="images/teams/${game.escudo_visitante}" alt="Escudo ${game.visitante}">
          <span class="team-name">${game.visitante}</span>
        </li>
      </ul>

      <dl class="match-info">
        <dt>Pênaltis:</dt>
        <dd>${game.penaltis}</dd>

        <dt>Placar Pênaltis:</dt>
        <dd>${game.placar_penaltis}</dd>

        <dt>Campeão:</dt>
        <dd>${game.campeao}</dd>
      </dl>

      <a href="#" class="btn btn-primary">${game.jogo}</a>
    `;

    finalContainer.appendChild(article);
  });
