async function cookieValidator(cookies){
  try {
    await externallyValidateCookies(cookies.testCookie)
  } catch {
    throw new Error("Invalid Cookies")
  }
}

module.exports = cookieValidator