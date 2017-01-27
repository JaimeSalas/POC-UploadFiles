import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import FileService from './API/fileService';

// TODO: Create element to display users
// TODO: Create state-less component to upload file
class App extends Component {
  constructor(props) {
    super(props);
    this.onUpload = this.onUpload.bind(this);
    this.onChangeFileSelection = this.onChangeFileSelection.bind(this);
    this.onClickFileSelection = this.onClickFileSelection.bind(this);
    FileService.initialize(`http://localhost:8000/api/files`);

    // TODO: Study how to allow multiple files selection.
    // TODO: Expose multi file selection as property.
    this.state = {
      file: '',
      uploadingFile: false
    };
  }

  onUpload(evt) {
    evt.stopPropagation();
    FileService.uploadFile(this.state.file);
  }

  onChangeFileSelection(evt) {
    evt.stopPropagation();
    this.setState({file:evt.target.value})
  }

  onClickFileSelection(evt) {
    evt.stopPropagation();
  }

  render() {
    return (
      <div>
        <h2>Upload Files</h2>

        <input type="file" name="uploafile"
        onChange={this.onChangeFileSelection}
        onClick={this.onClickFileSelection}/>
        <input type="button" value="uploadButton" onClick={this.onUpload} />


      </div>
    );
  }
}

// TODO: Create state less component to upload document.
export default App;
