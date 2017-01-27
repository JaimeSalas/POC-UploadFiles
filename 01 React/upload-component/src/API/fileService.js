class FileService {
  static baseUrl = '';

  static initialize(baseUrl) {
    this.baseUrl = baseUrl;
  }

  static uploadFile(file, callback) { // Pass a callback to grab progress
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('userId', '5888fbbeca10712d7c18e672'); // Ensure valid _id

    let promise = new Promise((resolve, reject) => {
      const client = new XMLHttpRequest();

      client.onerror = (event) => {
        const result = JSON.parse(event.target.response);
        reject(result);
      };

      client.onreadystatechange = (event) => {
        // TODO: Grab progess and expose on callback
        if (client.readystate === 4) {
          resolve('upload completed');
        }

        if (callback && client.readystate !== 4) {
          callback(event);
        }
      };

      client.open('post', this.baseUrl);
      client.send(formData);
    });

    return promise;
  }
}

export default FileService
