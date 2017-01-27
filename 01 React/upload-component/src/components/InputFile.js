import React from 'react';

const InputFile = ({onChangeFileSelection, onClickFileSelection, onUpload}) => {
  return (
    <div>
      <input
       type="file"
       name="uploadfile"
       onChange={onChangeFileSelection}
       onClick={onClickFileSelection}/>
     <input
      type="button"
      value="Subir Fichero"
      onClick={onUpload} />
    </div>
  );
};

InputFile.propTypes = {
  onChangeFileSelection: React.PropTypes.func,
  onClickFileSelection: React.PropTypes.func,
  onUpload: React.PropTypes.func
};

export default InputFile;
