import store from "../store";
var sprintf = require("sprintf-js").sprintf;

const translation = (key, ...fields) => {
  try {
    let state = store.getState();
    let sub = key ? key.substring(0, 2) : "";
    if (sub === "c." || sub === "s.") {
      if (state.authentication.loggedIn && state.authentication.userLanguage) {
        let texto = state.authentication.userLanguage.find(item => {
          return item.codigoLabelSistema === key;
        }).textoIdiomaLabelSistema;
        return texto ? sprintf(texto, ...fields) : key;
      } else {
        let idiomaPadraoNavegador =
          (navigator.languages && navigator.languages[0]) ||
          navigator.language ||
          navigator.userLanguage ||
          "pt-BR";

        switch (key) {
          case "c.login.networkerror":
            switch (idiomaPadraoNavegador) {
              case "en-US":
                return "Could not connect to server.";
              case "pt-BR":
                return "Não foi possível conectar no servidor.";
              case "es-ES":
                return "No se pudo conectar en el servidor.";
              default:
                return "Não foi possível conectar no servidor.";
            }
          case "c.login.usuarioinvalido":
            switch (idiomaPadraoNavegador) {
              case "en-US":
                return "Invalid user.";
              case "pt-BR":
                return "Usuário inválido.";
              case "es-ES":
                return "Usuario no válido.";
              default:
                return "Usuário inválido.";
            }

          default:
            return key;
        }
      }
    } else {
      return key;
    }
  } catch (error) {
    console.log(
      "Erro de tradução na chave: " + key + ", erro: " + error.message
    );
    return key || "";
  }
};

export default translation;
