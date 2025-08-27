// Configuração do Firebase (cole aqui suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyDpv8J6BvoYmbttM8FhJYM2TaK7tab71lM",
  authDomain: "analise-de-credito-imobiliario.firebaseapp.com",
  projectId: ", analise-de-credito-imobiliario",
  storageBucket: "analise-de-credito-imobiliario.firebasestorage.app",
  messagingSenderId: "407743825411",
  appId: "1:407743825411:web:55a261e341ec0d2822f036"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById("creditoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const email = document.getElementById("email").value;
  const arquivos = document.getElementById("documentos").files;

  try {
    let urls = [];
    for (let file of arquivos) {
      const storageRef = storage.ref("documentos/" + Date.now() + "_" + file.name);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      urls.push(url);
    }

    await db.collection("clientes").add({
      nome,
      whatsapp,
      email,
      documentos: urls,
      criado_em: new Date()
    });

    document.getElementById("mensagem").innerText = "✅ Dados enviados com sucesso!";
    document.getElementById("creditoForm").reset();
  } catch (err) {
    console.error(err);
    document.getElementById("mensagem").innerText = "❌ Erro ao enviar.";
  }
});
