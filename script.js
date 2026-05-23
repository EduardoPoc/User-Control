const tabela = document.getElementById("tabela");
const novo = document.getElementById("new");
const pesquisar = document.getElementById("pesquisar");
const entrada = document.getElementById("entrada");
const btnCadastro = document.getElementById("cadastrar");

novo.addEventListener("click", () => {
  const path = window.location.pathname;
  if (path === "/index.html" || path.endsWith("index.html")) {
    window.location.href = "index2.html";
  } else {
    window.location.href = "index.html";
  }
});

if (btnCadastro) {
  btnCadastro.addEventListener("click", (e) => {
    e.preventDefault();

    const funcionarios = JSON.parse(
      localStorage.getItem("funcionarios") || "[]",
    );
    const id =
      funcionarios.length > 0
        ? funcionarios[funcionarios.length - 1].id + 1
        : 1;

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const data = document.getElementById("data").value;
    const tel = document.getElementById("tel").value;

    funcionarios.push({ id, nome, email, data, tel });
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

    alert("Cadastrado com sucesso!");
    window.location.href = "index.html";
  });
}

if (pesquisar && entrada && tabela) {
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios") || "[]");

  funcionarios.forEach(({ id, nome, email, data, tel }) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `<td>${id}</td><td>${nome}</td><td>${email}</td><td>${data}</td><td>${tel}</td>`;
    tabela.appendChild(linha);
  });

  pesquisar.addEventListener("click", () => {
    const termoBusca = entrada.value.trim().toLowerCase();

    if (!termoBusca) {
      alert("Digite algo para pesquisar!");
      return;
    }

    const linhas = tabela.querySelectorAll("tr");
    let encontrou = false;

    linhas.forEach((linha) => {
      const nome = linha.cells[1].textContent.toLowerCase();
      if (nome.includes(termoBusca)) {
        linha.classList.add("selecionado");
        encontrou = true;
        setTimeout(() => linha.classList.remove("selecionado"), 2000);
      }
    });

    if (!encontrou) {
      alert(`Funcionário "${entrada.value}" não encontrado.`);
    }
  });
}
