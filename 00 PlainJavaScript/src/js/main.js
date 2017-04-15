document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve users
  let users, userId;

  api.userService.getUsers()
    .then(result => {
      users = JSON.parse(result);
      userinterface.uiBuilder.populateUsersTable(users);
    })
    .catch(err => console.log(err));
  
  const tableUsers = document.getElementById('users');
  tableUsers.addEventListener('click', (event) => {
    event.stopPropagation();
    userId = readUserId(event.target.parentElement);
    userinterface.uiBuilder.fillElementText('current-user-name',readUser(event.target.parentElement));
    // TODO: Populate user files
  });

  const readUserId = (row) => row.getAttribute('data-user-id');
  const readUser = (row) => `${row.childNodes[1].innerText}, ${row.childNodes[0].innerText}`;

  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('click', (event) => {
    const filesInput = document.getElementById('uploadfile');
    api.fileService.uploadFile(filesInput.files, userId)
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })
  });
});
