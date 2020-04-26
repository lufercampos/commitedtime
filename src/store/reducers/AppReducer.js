import * as types from "../constants/AppConstants";

const defaultState = {
  notifications: [],
  modals: [],
  isOpenDrawer: false,
  isOpenDrawerResponsivo: false,
  menusCollapsed: !!localStorage.getItem("menusCollapsed")
    ? JSON.parse(localStorage.getItem("menusCollapsed"))
    : [],
  selectedMenuIndex: localStorage.getItem("selectedMenuIndex") || 0,
  loading: false,
  filtrosMobile: [],
  colunasMobile: [],
  currentCreateJobProps: {},
  serverCurrentTimer: null,
};

export default function appState(state = defaultState, action) {
  switch (action.type) {
    case types.SERVER_CURRENT_TIMER:
      return {
        ...state,
        serverCurrentTimer: action.serverCurrentTimer,
      };

    case types.CURRENT_CREATE_JOB_PROPS:
      return {
        ...state,
        currentCreateJobProps: action.currentCreateJobProps,
      };

    case types.LIMPA_FILTROS_MOBILE:
      return {
        ...state,
        filtrosMobile: [],
        colunasMobile: [],
      };

    case types.SET_COLUNAS_MOBILE:
      return {
        ...state,
        colunasMobile: action.colunas,
      };

    case types.SET_COLUNA_FILTRO_MOBILE:
      return {
        ...state,
        filtrosMobile: [
          ...state.filtrosMobile,
          {
            ...action.coluna,
          },
        ],
        colunasMobile: state.colunasMobile.filter((item) => {
          return item !== action.coluna;
        }),
      };

    case types.REMOVE_COLUNA_FILTRO_MOBILE:
      return {
        ...state,
        colunasMobile: [
          ...state.colunasMobile,
          {
            ...action.coluna,
          },
        ],
        filtrosMobile: state.filtrosMobile.filter((item) => {
          return item !== action.coluna;
        }),
      };

    case types.TOOGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    case types.SET_COLLAPSED_MENU:
      return {
        ...state,
        menusCollapsed: action.menusCollapsed,
      };

    case types.SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenuIndex: action.selectedIndex,
      };

    case types.TOOGLE_DRAWER:
      return {
        ...state,
        isOpenDrawer: !state.isOpenDrawer,
        isOpenDrawerResponsivo: false,
      };

    case types.TOOGLE_DRAWER_RESPONSIVO:
      return {
        ...state,
        isOpenDrawerResponsivo: !state.isOpenDrawerResponsivo,
        isOpenDrawer: false,
      };

    case types.SHOW_ALERT:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };

    case types.HIDE_ALERT:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };

    case types.OPEN_MODAL:
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...action.payload,
          },
        ],
      };

    case types.CLOSE_MODAL:
      return {
        ...state,
        modals: state.modals.splice(0, state.modals.length - 1),
      };

    case types.CLEAR_MODAL:
      return {
        ...state,
        modals: [],
      };

    default:
      return state;
  }
}
