const auth = firebase.auth();

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.signInWithEmailAndPassword(email, senha)
      .then(() => window.location.href = "admin.html")
      .catch(err => document.getElementById("msg").innerText = "❌ " + err.message);
  });
}

// Logout
function logout() {
  auth.signOut().then(() => window.location.href = "login.html");
}

// Dashboard
if (window.location.pathname.includes("admin.html")) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      const db = firebase.firestore();
      db.collection("clientes").orderBy("criado_em", "desc").onSnapshot(snapshot => {
        let html = "";
        snapshot.forEach(doc => {
          let c = doc.data();
          html += `
            <tr>
              <td>${c.nome}</td>
              <td>${c.whatsapp}</td>
              <td>${c.email}</td>
              <td>${c.documentos.map(d => `<a href="${d}" target="_blank">📄</a>`).join(" ")}</td>
            </tr>`;
        });
        document.querySelector("#tabela tbody").innerHTML = html;
      });
    }
  });
}
