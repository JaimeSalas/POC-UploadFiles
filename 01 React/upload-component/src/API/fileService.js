class FileService {
  static baseUrl = '';

  static initialize(baseUrl) {
    this.baseUrl = baseUrl;
  }

  static uploadFile(file) {
    console.log(this.baseUrl);
    console.log(file);
  }
}

export default FileService
