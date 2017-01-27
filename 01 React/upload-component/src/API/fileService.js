class FileService {
  static baseUrl = '';

  static initialize(baseUrl) {
    this.baseUrl = baseUrl;
  }

  static uploadFile(file, callback) { // Pass a callback to grab progress
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('userId', '5888fbc8ca10712d7c18e674'); // Ensure valid _id
    const self = this;
    let promise = new Promise(function(resolve, reject) {
      const client = new XMLHttpRequest();

      client.onerror = (event) => {
        const result = JSON.parse(event.target.response);
        reject(result);
      };

      client.onreadystatechange = (event) => {
        // TODO: Grab progess and expose on callback
        if (client.readyState === 4) {
          resolve('upload completed');
        }
      };

      client.upload.onprogress = (event) => {
        callback(event);
      };

      client.open('post', self.baseUrl);
      client.send(formData);
    });

    return promise;
  }
}

export default FileService
