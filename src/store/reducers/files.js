const INITIAL_STATE = {
  files: [],
};

function files(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPLOAD_FILE":
      return {
        files: [...state.files, ...action.payload.files],
      };
    case "FILE_ERROR": {
      const updatedFiles = state.files.filter(
        (file) => file.id != action.payload.file.id
      );
      action.payload.file.error = action.payload.err;
      updatedFiles.push(action.payload.file);

      return {
        files: updatedFiles,
      };
    }
    case "FILE_PROGRESS": {
      const updatedFiles = state.files.filter(
        (file) => file.id != action.payload.file.id
      );
      action.payload.file.progress = action.payload.progress;
      updatedFiles.push(action.payload.file);

      return {
        files: updatedFiles,
      };
    }
    case "FILE_SUCCESS": {
      const updatedFiles = state.files.filter(
        (file) => file.id != action.payload.file.id
      );
      action.payload.file.uploaded = true;
      action.payload.file.id = action.payload.id;
      action.payload.file.url = action.payload.url;
      updatedFiles.push(action.payload.file);

      return {
        files: updatedFiles,
      };
    }
    case 'DELETE_FILE': {
      const updatedFiles = state.files.filter(
        (file) => file.id != action.payload.id
      );

      return {
        files: updatedFiles,
      };
    }
    case 'INITIAL_UPLOAD': {
      return {
        files: action.payload.files,
      }
    }
    default:
      return state;
  }
}

export default files;
