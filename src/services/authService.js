import request from 'superagent'

const authService = store => next => action => {
  /*
  Pass all actions through by default
  */
  switch (action.type) {
  case 'LOGIN_REQUEST':
    next(action)
    /*
    In case we receive an action to send an API request, send the appropriate request
    */
    request
      .post('http://localhost:3000/api/v1/auth_user')
      .set('Content-Type', 'application/json')
      .send({ email : action.email })
      .send({ password: action.password })
      .end((err, res) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: 'LOGIN_FAILURE',
            message: "Invalid email / password",
            isFetching: false,
            isAuthenticated: false
          })
        }
        const data = JSON.parse(res.text)
        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */
        localStorage.setItem('token', data.auth_token)
        next({
          type: 'LOGIN_SUCCESS',
          token: data.auth_token
        })
      })
    break
  case 'LOGOUT_REQUEST':
    next(action)
    localStorage.removeItem('token')
    next({
      type: 'LOGOUT_SUCCESS'
    })
  /*
  Do nothing if the action does not interest us
  */
  default:
    break
  }

};

export default authService