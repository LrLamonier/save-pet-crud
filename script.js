const accounts = [
  {
    name: "Lucas Lamonier",
    email: "lucas@lucas.com",
    telephone: "61912344321",
    password: "MTIzNDU2",
  },
  {
    name: "Fábio Lamonier",
    email: "fabio@fabio.com",
    telephone: "62998766789",
    password: "6r48s6te64e4446",
  },
];

// GET listar contas
const accountsContainer = document.getElementById("accounts");
const accountsError = document.getElementById("accounts-error");

const showAccounts = () => {
  let data = "";
  if (accounts.length === 0) {
    accountsError.innerHTML = "Nenhuma conta cadastrada!";
  } else {
    accounts.forEach((el, i) => {
      data += "<tr>";
      data += `<td>${el.name}</td>`;
      data += `<td>- ${el.email}</td>`;
      data += `<td>- ${el.telephone}</td>`;
      data += `<td>- ${accounts[i].password}`;
      data += "</tr>";
      data += "<br />";
    });
  }
  accountsContainer.innerHTML = data;
};
showAccounts();

// POST criar conta
const signupForm = document.getElementById("signup-form");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupTelephone = document.getElementById("signup-telephone");
const signupPassword = document.getElementById("signup-password");
const signupPassConfirm = document.getElementById("signup-pass-confirm");
const signupError = document.getElementById("signup-error");

const signup = () => {
  signupError.innerText = "";

  // validar formulário
  let error = "";

  // validar nome
  if (!signupName.value) {
    error += "Nome inválido.";
    signupName.value = "";
  }

  //validar email
  if (
    !signupEmail.value ||
    !signupEmail.value.includes("@") ||
    !signupEmail.value.includes(".")
  ) {
    error += " Email inválido.";
    signupEmail.value = "";
  }
  accounts.forEach((el) => {
    if (signupEmail.value === el.email) {
      error += " Email já cadastrado.";
    }
  });

  // validar telefone
  if (!signupTelephone.value) {
    error += " Telefone inválido.";
    signupTelephone.value = "";
  }

  // validar senha e confirmação
  if (!signupPassword.value) {
    error += " Senha inválida.";
    signupPassword.value = "";
  }
  if (
    signupPassword.value &&
    signupPassConfirm.value &&
    signupPassConfirm.value !== signupPassword.value
  ) {
    error += " As senhas não conferem.";
    signupPassConfirm.value = "";
  }
  if (!signupPassConfirm.value) {
    error += " Confirmação de senha inválida.";
  }

  // exibir erro
  if (error.length > 0) {
    return (signupError.innerText = error);
  }

  // criar conta
  accounts.push({
    name: signupName.value,
    email: signupEmail.value,
    telephone: signupTelephone.value,
    password: btoa(signupPassword.value),
  });

  // exibir os novos valores
  showAccounts();
};
signupForm.addEventListener("submit", signup);

// administração da conta
const loginContainer = document.getElementById("login-container");
const accountContainer = document.getElementById("account-container");
const patchForm = document.getElementById("patch-form");
const patchName = document.getElementById("patch-name");
const patchEmail = document.getElementById("patch-email");
const patchTelephone = document.getElementById("patch-telephone");

// POST login
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");

let activeAccountID = -1;

const login = () => {
  let accFound = -1;
  loginError.innerText = "";

  // validar email
  if (!loginEmail.value) {
    return (loginError.innerText = "Email inválido.");
  }

  // verificar se a conta existe
  accounts.forEach((el, i) => {
    if (el.email === loginEmail.value) {
      accFound = i;
    }
  });

  if (accFound === -1) {
    loginEmail.value = "";
    loginPassword.value = "";
    loginError.innerText = "Este email não está cadastrado.";
    return;
  }

  // verificar se a senha está correta
  if (btoa(loginPassword.value) !== accounts[accFound].password) {
    return (loginError.innerText = "Senha incorreta.");
  }

  // fazer login
  activeAccountID = accFound;

  // atualizar interface
  loginContainer.style.display = "none";
  accountContainer.style.display = "block";
  patchName.value = accounts[activeAccountID].name;
  patchEmail.value = accounts[activeAccountID].email;
  patchTelephone.value = accounts[activeAccountID].telephone;
};
// const login = () => {
//   activeAccountID = 0;
//   loginContainer.style.display = "none";
//   accountContainer.style.display = "block";
//   patchName.value = accounts[activeAccountID].name;
//   patchEmail.value = accounts[activeAccountID].email;
//   patchTelephone.value = accounts[activeAccountID].telephone;
// };
loginForm.addEventListener("submit", login);

// POST logout
const logoutBtn = document.getElementById("logout-btn");

const logout = () => {
  activeAccountID = -1;
  loginContainer.style.display = "block";
  accountContainer.style.display = "none";
};
logoutBtn.addEventListener("click", logout);

// PATCH alterar dados
const patchError = document.getElementById("patch-error");

const patchInfo = () => {
  // validar formulário
  let error = "";

  // validar nome
  if (!patchName.value) {
    error += "Nome inválido.";
  }

  //validar email
  if (
    !patchEmail.value ||
    !patchEmail.value.includes("@") ||
    !patchEmail.value.includes(".")
  ) {
    error += " Email inválido.";
  }
  accounts.forEach((el, i) => {
    if (i !== activeAccountID && patchEmail.value === el.email) {
      error += " Email já cadastrado.";
    }
  });

  // validar telefone
  if (!patchTelephone.value) {
    error += " Telefone inválido.";
    patchTelephone.value = "";
  }

  // exibir erro
  if (error.length > 0) {
    return (patchError.innerText = error);
  }

  accounts[activeAccountID].name = patchName.value;
  accounts[activeAccountID].email = patchEmail.value;
  accounts[activeAccountID].telephone = patchTelephone.value;

  showAccounts();
};
patchForm.addEventListener("submit", patchInfo);

// DELETE excluir conta
const deleteForm = document.getElementById("delete-form");
const deletePassword = document.getElementById("delete-password");
const deleteError = document.getElementById("delete-error");

const deleteAcc = () => {
  deleteError.innerText = "";

  if (btoa(deletePassword.value) !== accounts[activeAccountID].password) {
    return (deleteError.innerText = "Senha incorreta.");
  }

  accounts.splice(activeAccountID, 1);
  deletePassword.value = "";
  activeAccountID = -1;
  loginContainer.style.display = "block";
  accountContainer.style.display = "none";
  showAccounts();
};
deleteForm.addEventListener("submit", deleteAcc);

////////////////////////////////////////////////////
///////////////////////////////////////////////////
// Ocorrências

const events = [
  {
    type: "Gato",
    location: "-16.7064707,-49.3463833,14",
    comment: "Gata com 3 filhotinhos",
  },
  {
    type: "Cachorro",
    location: "-16.7064707,-49.3463833,14",
    comment: "",
  },
];

const eventsForm = document.getElementById("event-form");
const eventsContainer = document.getElementById("events");
const eventsType = document.getElementById("event-type");
const eventsLocation = document.getElementById("event-location");
const eventsComment = document.getElementById("event-comment");

// mostrar ocorrências
const showEvents = () => {
  let data = "";
  if (events.length === 0) {
    eventsError.innerHTML = "Nenhuma conta cadastrada!";
  } else {
    events.forEach((el, i) => {
      data += "<tr>";
      data += `<td>${el.type}</td>`;
      data += `<td>| ${el.location}</td>`;
      data += `<td>| ${el.comment}</td>`;
      data += "</tr>";
      data += "<br />";
    });
  }
  eventsContainer.innerHTML = data;
};
showEvents();

// POST criar conta
const eventForm = document.getElementById("signup-form");
const eventType = document.getElementById("event-type");
const eventLocation = document.getElementById("event-location");
const eventComment = document.getElementById("event-comment");
const eventError = document.getElementById("events-input-error");

const addEvent = () => {
  eventError.innerText = "";

  // validar formulário
  let error = "";

  // validar tipo
  if (eventType.value === "") {
    error += "Selecione um tipo.";
    eventType.value = "";
  }

  // validar localização
  if (!eventLocation.value) {
    error += " Localização inválida.";
    signupEmail.value = "";
  }

  // exibir erro
  if (error.length > 0) {
    return (eventError.innerText = error);
  }

  // criar conta
  events.push({
    type: eventType.value,
    location: eventLocation.value,
    comment: eventComment.value,
  });

  // exibir os novos valores
  showEvents();
};
eventsForm.addEventListener("submit", addEvent);
