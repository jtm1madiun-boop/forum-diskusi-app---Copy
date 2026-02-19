const ActionType = {
  SET_THEME: 'SET_THEME',
};

function setThemeActionCreator(theme) {
  return {
    type: ActionType.SET_THEME,
    payload: {
      theme,
    },
  };
}

/**
 * Thunk function to set the theme and save it to localStorage.
 * @param {('light' | 'dark')} theme
 */
function asyncSetTheme(theme) {
  return (dispatch) => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);

    // Dispatch action to update Redux state
    dispatch(setThemeActionCreator(theme));
  };
}

export {
  ActionType,
  setThemeActionCreator,
  asyncSetTheme,
};