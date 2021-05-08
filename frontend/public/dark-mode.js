(() => {
  "use strict"

  const DARK_MODE_STORAGE_KEY = "@@TWI_DARK_MODE_ENABLED"

  /**
   * Overrides classes on document.body depending on the dark mode status
   *
   * @param {boolean} isEnabled
   */
  function setClassName(isEnabled) {
    document.body.classList.add(isEnabled ? "dark" : "light")
    document.body.classList.remove(isEnabled ? "light" : "dark")
  }

  /**
   * Changes the dark mode status
   *
   * @param {MediaQueryList} event
   */
  function setDarkMode({matches}) {
    setClassName(matches)

    if (sessionStorage.getItem(DARK_MODE_STORAGE_KEY) === null) {
      sessionStorage.setItem(DARK_MODE_STORAGE_KEY, matches)
    }
  }

  setDarkMode(matchMedia("(prefers-color-scheme: dark)"))
})()
