import React, { Component } from 'react';
import './App.css';
import FileService from './API/fileService';
import InputFile from './components/InputFile';

// TODO: Create state-less component to display users
// TODO: Create state-less component to display upload
// TODO: Use this style: http://callmenick.com/_development/input-text-styles/
class App extends Component {
  constructor(props) {
    super(props);
    this.onUpload = this.onUpload.bind(this);
    this.onChangeFileSelection = this.onChangeFileSelection.bind(this);
    this.onClickFileSelection = this.onClickFileSelection.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this)
    FileService.initialize(`http://localhost:8000/api/files`);

    // TODO: Study how to allow multiple files selection.
    // TODO: Expose multi file selection as property.
    // TODO: Use componentWillMount to load user data.
    // TODO: Read this -> https://facebook.github.io/react/docs/state-and-lifecycle.html
    // More info: http://andrewhfarmer.com/react-ajax-best-practices/
    this.state = {
      file: null,
      uploadingFile: false,
      uploadPercentage: ''
    };
  }
  // onUpload(inputRef)
  // testOnUpload(test) {
  //   return (evt) => {}
  // } 

  onUpload(evt, test) {
    evt.stopPropagation();
    this.setState({uploadingFile:true});
    FileService.uploadFile(this.state.file, this.onUploadProgress)
      .then((result) => {
        setTimeout(() => {
          this.setState({uploadingFile:false});
        }, 1000);
      }).catch((err) => {
        console.log(err);
        this.setState({uploadingFile:false});
      });
  }

  onChangeFileSelection(evt) {
    evt.stopPropagation();
    let file = evt.target.files[0];
    this.setState({file:file});
  }

  onClickFileSelection(evt) {
    evt.stopPropagation();
  }

  onUploadProgress(event) {
    // More info: http://stackoverflow.com/questions/7381883/xmlhttprequest-a-problem-with-event-loaded-and-event-total-values
    if (event.lengthComputable) {
      let uploadFilePercentage = Math.floor((event.loaded * 100)/event.total);
      this.setState({uploadPercentage:uploadFilePercentage});
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Upload Files</h2>
        <InputFile
          onClickFileSelection={this.onClickFileSelection}
          onChangeFileSelection={this.onChangeFileSelection}
          onUpload={this.onUpload}/>
        {
          this.state.uploadingFile &&
          <div className="display-progress">
            <label>Progress:</label>
            <span>{this.state.uploadPercentage}</span>
          </div>
        }
      </div>
    );
  }
}

export default App;
