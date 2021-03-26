const translator = require('./translator')

module.exports = {
  checkEmptyFields: (fields) => {
    const emptyFieldError = {}
    for (const fieldName in fields) {
      if (!fields[fieldName]) {
        emptyFieldError[fieldName] = `${translator(fieldName)}不得為空白`
      }
    }
    if (Object.keys(emptyFieldError).length) {
      return { isFieldEmpty: true, emptyFieldError }
    } else {
      return { isFieldEmpty: false }
    }
  },
  checkEmailFormat: (email) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return {
        isEmailFormatValid: true,
      }
    } else {
      return {
        isEmailFormatValid: false,
        emailFormatError: 'Email格式有誤'
      }
    }
  },
  checkMatch: (fields) => {
    const values = Object.values(fields)
    const fieldNames = Object.keys(fields)
    if (values[0] !== values[1]) {
      return {
        isMatch: false,
        matchError: `${translator(fieldNames[0])}與${translator(fieldNames[1])}不相符`
      }
    } else {
      return {
        isMatch: true
      }
    }
  },
}