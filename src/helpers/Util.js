import store from "../store";
import history from "../helpers/History";
import { parse } from "date-fns";

export const getDate = (
  diasSubtrair = 0,
  isInicio = false,
  isFinal = false
) => {
  let dataAtual = new Date();
  return new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth(),
    dataAtual.getDate() - diasSubtrair,
    isInicio ? 0 : isFinal ? 23 : 0,
    isInicio ? 0 : isFinal ? 59 : 0,
    isInicio ? 0 : isFinal ? 59 : 0
  );
};

const getTarefas = menu => {
  try {
    menu.map(n => {
      if (n.children && Object.keys(n.children).length > 0) {
        getTarefas(n.children);
      } else {
        if ("/" + n.rota === history.location.pathname) {
          console.log(n);
          return n.tarefas;
        }
      }
    });
  } catch (error) {
    return [];
  }
};

export const removerAcentos = newStringComAcento => {
  var string = newStringComAcento;
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g
  };

  for (var letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }

  return string;
};

export const getViewTasks = () => {
  getTarefas(store.getState().appState.menu);
};

export const formatNumberToString = (value, casasDecimais = 1) => {
  if (!value) {
    value = "0";
  }

  return value.toLocaleString(
    JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR",
    {
      maximumFractionDigits: casasDecimais !== null ? casasDecimais : 1,

      minimumFractionDigits: casasDecimais !== null ? casasDecimais : 1
    }
  );
};

/**
 * Buscar o formato da data de acordo com o idioma do usuário
 */
export const getLocaleFormatDateTime = () => {
  let localeUser = JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR";

  if (localeUser === "pt-BR") {
    return "dd/MM/yyyy HH:mm:ss";
  } else if (localeUser === "en-US") {
    return "MM/dd/yyyy HH:mm:ss";
  } else if (localeUser === "es-ES") {
    return "dd/MM/yyyy HH:mm:ss";
  } else {
    return "dd/MM/yyyy HH:mm:ss";
  }
};

/**
 * Buscar o formato da data de acordo com o idioma do usuário
 */
export const getLocaleFormatDate = () => {
  let localeUser = JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR";

  if (localeUser === "pt-BR") {
    return "dd/MM/yyyy";
  } else if (localeUser === "en-US") {
    return "MM/dd/yyyy";
  } else if (localeUser === "es-ES") {
    return "dd/MM/yyyy";
  } else {
    return "dd/MM/yyyy";
  }
};

/**
 * Buscar o formato da data de acordo com o idioma do usuário
 */
export const getLocaleFormatTime = () => {
  let localeUser = JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR";

  if (localeUser === "pt-BR") {
    return "HH:mm:ss";
  } else if (localeUser === "en-US") {
    return "HH:mm:ss";
  } else if (localeUser === "es-ES") {
    return "HH:mm:ss";
  } else {
    return "HH:mm:ss";
  }
};

export const convertStringToDate = (data, format) => {
  try {
    if (typeof data === "string" || data instanceof String) {
      return parse(data, format, new Date());
    } else {
      return data;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

/**
 * Função para formatar data
 * @param {Date} data - Data no formato Date
 * @param {boolean} initialDate - Se for inicio, irá incluir a hora 00:00:00
 * @param {boolean} finalDate - Se for fim, irá incluir a hora 23:59:59
 * @param {boolean} withTime - Se formata incluindo a hora
 * @param {boolean} withMiliseconds - Se formata incluindo os milisegundos
 */
export const formatDateForDB = (
  data,
  initialDate = false,
  finalDate = false,
  withTime = true,
  withMiliseconds = false,
  format = "dd/MM/yyyy HH:mm:ss"
) => {
  if (data) {
    if (typeof data === "string" || data instanceof String) {
      data = parse(data, format, new Date());
    }

    if (data && !isNaN(data.getTime())) {
      return (
        data.getFullYear() +
        "-" +
        ("0" + parseInt(data.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + data.getDate()).slice(-2) +
        (withTime
          ? " " +
            (initialDate
              ? "00"
              : finalDate
              ? "23"
              : "0" + data.getHours()
            ).slice(-2) +
            ":" +
            (initialDate
              ? "00"
              : finalDate
              ? "59"
              : "0" + data.getMinutes()
            ).slice(-2) +
            ":" +
            (initialDate
              ? "00"
              : finalDate
              ? "59"
              : "0" + data.getSeconds()
            ).slice(-2) +
            (withMiliseconds
              ? initialDate || finalDate
                ? ".000"
                : "." + (data.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
              : "")
          : "")
      );
    } else {
      return data;
    }
  } else {
    return null;
  }
};

export const formatTimestampForDatePicker = (
  timestamp,
  initialDate = false,
  finalDate = false,
  withTime = true,
  withMiliseconds = false
) => {
  let data = new Date(timestamp);

  return (
    data.getFullYear() +
    "-" +
    ("0" + parseInt(data.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + data.getDate()).slice(-2) +
    (withTime
      ? (initialDate ? "00" : finalDate ? "23" : "0" + data.getHours()).slice(
          -2
        ) +
        ":" +
        (initialDate ? "00" : finalDate ? "59" : "0" + data.getMinutes()).slice(
          -2
        ) +
        ":" +
        (initialDate ? "00" : finalDate ? "59" : "0" + data.getSeconds()).slice(
          -2
        ) +
        (withMiliseconds
          ? initialDate || finalDate
            ? ".000"
            : "." + (data.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
          : "")
      : "")
  );
};

export const formatDateLocaleDateString = data => {
  return data.toLocaleDateString(
    JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR"
  );
};

export const formatDateTimeLocaleDateString = data => {
  return (
    data.toLocaleDateString(
      JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR"
    ) +
    " " +
    data.toLocaleTimeString(
      JSON.parse(localStorage.getItem("user")).idIdioma || "pt-BR"
    )
  );
};

/*Usado para verificar se os campos não validados pertencem ao form
export const checkField = ref => {
  if (this.props.invalid) {
    const erros = this.props.VeiculoEditForm.syncErrors;
    const comp = this.refs[ref];
    if (comp && comp.props.children) {
      let children = comp.props.children;
      let obj = null;
      for (let index = 0; index < children.length; index++) {
        obj = children[index];
        if (obj.props && obj.props.name && erros[obj.props.name]) {
          return true;
        }
      }
    }
  }

  return false;
};*/
