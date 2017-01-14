document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve users
  api.userService.getUsers()
    .then(result => console.log(result))
    .catch(err => console.log(err));
});
