
const checkAuth = (req, resp, next) => {
  console.log('checkAuth')
  next()
}

export default checkAuth