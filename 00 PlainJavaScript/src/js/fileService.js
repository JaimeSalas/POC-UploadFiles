api.fileService = (function () {
  const baseUrl = `http://localhost:8000/api/files`;
  //const baseUrl = `http://localhost:8000/upload`;
  const uploadFile = function uploadFile(files) {
    // input type="file", pass as well related user.
    // https://developer.mozilla.org/es/docs/XMLHttpRequest/Using_XMLHttpRequest
    const formData = new FormData();
    formData.append('upload', files[0]); // TODO: Enable multiple files upload. Create validations for file type.
    //NOTE: http://stackoverflow.com/questions/6884382/node-js-formidable-upload-with-xhr
    // formidable do not use extra headers.

    // TODO: Use user id. Select from table.
    formData.append('userId', '5888fbc3ca10712d7c18e673'); // Ensure that userId exists on database.
    let promise = new Promise(function(resolve, reject) {
      const client = new XMLHttpRequest();
      client.onerror = (event) => {
        const result = JSON.parse(event.target.response);
        reject(result);
      };
      // TODO: Expose progress
      client.onreadystatechange = (event) => {
        if (client.readyState === 4) { // TODO: Remove magic numbers
          resolve('upload completed');
        }
      };
      client.open('post', baseUrl);
      client.send(formData);
    });
    return promise;
  };

  return {
    uploadFile
  };
}());
