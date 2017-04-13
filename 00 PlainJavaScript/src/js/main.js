document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve users
  let users;

  api.userService.getUsers()
    .then(result => {
      users = JSON.parse(result)
        .map(r => getUserClientEntity(r));
    })
    .catch(err => console.log(err));
  
  // TODO: Move to a service
  const getUserClientEntity = (serverEntity) => {
    const userFiles = serverEntity.files.map(f => {
      let file = app.File();
      file.name = f.name;
      file.id = f._id;
      file.size = f.size;

      return file;
    });

    const user = app.User();
    user.name = serverEntity.name;
    user.lastName =  serverEntity.lastName; 
    user.id = serverEntity._id;
    user.files = userFiles;

    return user;
  };
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
