import { ActionType } from './action';

// Get initial theme from localStorage or default to 'light'
const initialTheme = localStorage.getItem('theme') || 'light';

function themeReducer(theme = initialTheme, action = {}) {
  switch (action.type) {
    case ActionType.SET_THEME:
      return action.payload.theme;
    default:
      return theme;
  }
}

export default themeReducer;