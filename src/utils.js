export const themeSwitcher = () => {
  const body = document.querySelector('body')
  body.classList.toggle('dark')
}

export const getCharCode = (char) => {
  const c = char.toLowerCase();
  let charCode = null;
  switch (c.charCodeAt(0)) {
    case 229:
      charCode = 97;
      break;
  
    default:
      charCode = c.charCodeAt(0)
      break;
  }

  return charCode
}