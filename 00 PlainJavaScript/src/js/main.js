document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve users
  api.userService.getUsers()
    .then(result => console.log(result))
    .catch(err => console.log(err));
  // TODO: Display users on table. Select 
  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('click', (event) => {
    const filesInput = document.getElementById('uploadfile');
    // console.log(file.files);
    api.fileService.uploadFile(filesInput.files)
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })
  });
});
