import * as types from "../constants/AppConstants";

export function setserverCurrentTimer(serverCurrentTimer) {
  return {
    type: types.SERVER_CURRENT_TIMER,
    serverCurrentTimer: serverCurrentTimer,
  };
}

export function setCurrentCreateJobProps(props) {
  return {
    type: types.CURRENT_CREATE_JOB_PROPS,
    currentCreateJobProps: props,
  };
}

export function limparFiltrosMobile() {
  return {
    type: types.LIMPA_FILTROS_MOBILE,
  };
}

export function setColunasMobile(colunas) {
  return {
    type: types.SET_COLUNAS_MOBILE,
    colunas: colunas,
  };
}

export function removeColunaFiltroMobile(coluna) {
  return {
    type: types.REMOVE_COLUNA_FILTRO_MOBILE,
    coluna: coluna,
  };
}

export function setColunaFiltroMobile(coluna) {
  return {
    type: types.SET_COLUNA_FILTRO_MOBILE,
    coluna: coluna,
  };
}

export function toogleLoading() {
  return {
    type: types.TOOGLE_LOADING,
  };
}

export function setCollapsedMenu(menusCollapsed) {
  return {
    type: types.SET_COLLAPSED_MENU,
    menusCollapsed: menusCollapsed,
  };
}

export function setSelectedMenu(selectedIndex) {
  return {
    type: types.SET_SELECTED_MENU,
    selectedIndex: selectedIndex,
  };
}

export function toogleDrawer() {
  return {
    type: types.TOOGLE_DRAWER,
  };
}

export function toogleDrawerResponsivo() {
  return {
    type: types.TOOGLE_DRAWER_RESPONSIVO,
  };
}

export function openModal(modalType, modalProps) {
  return {
    type: types.OPEN_MODAL,
    payload: { modalType, modalProps },
  };
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL,
  };
}

export const showAlert = (notification) => ({
  type: types.SHOW_ALERT,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeAlert = (key) => ({
  type: types.HIDE_ALERT,
  key,
});
