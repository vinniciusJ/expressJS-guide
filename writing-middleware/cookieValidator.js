module.exports = async (cookies) => {
    try{
        await externallyValidateCookie(cookies.testCookie)
    }
    catch{
        throw new Error('Invalid cookie')
    }
}