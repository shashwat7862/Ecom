export const checkLogin = () => {
  console.log('in checked Login ***')
  let loggedIn = false;
  const auth = localStorage.getItem('auth');
  console.log('auth ***', auth)
  if (auth) {
    loggedIn = true;
  }
  console.log('loggedIn **', loggedIn)
  return loggedIn;
}