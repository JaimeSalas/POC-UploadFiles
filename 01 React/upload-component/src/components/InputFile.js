import React from 'react';

/*
  onClick={onUpload(inputRef)} 
  onClick={(event) => onUpload(inputRef)(event)}
*/
const InputFile = ({onChangeFileSelection, onClickFileSelection, onUpload}) => {
  let inputRef = null;
  return (
    <div>
      <input
       type="file"
       name="uploadfile"
       onChange={onChangeFileSelection}
       onClick={onClickFileSelection}
       ref={(input) => { inputRef = input.name }}/>
     <input
      type="button"
      value="Subir Fichero"
      onClick={(evt) => onUpload(evt, inputRef)} />
    </div>
  );
};

InputFile.propTypes = {
  onChangeFileSelection: React.PropTypes.func,
  onClickFileSelection: React.PropTypes.func,
  onUpload: React.PropTypes.func
};

export default InputFile;
