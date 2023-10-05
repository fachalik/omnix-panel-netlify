/* eslint-disable no-new-func */
const isBrowser: boolean = new Function(`
  try {
    return this === window
  } catch(e) { 
    return false
  }
`)();

export default isBrowser;
