import { filesize } from "filesize";
import api from "../services/api";

export function uploadFile(files) {
  return (dispatch, getState) => {
    dispatch({
      type: "UPLOAD_FILE",
      payload: {
        files,
      },
    });

    files.map((file) => {
      const data = new FormData();
      data.append("file", file.file, file.name);
      api
        .post("/posts", data, {
          onUploadProgress: (e) => {
            const progress = (e.loaded * 100) / e.total;
            dispatch({
              type: "FILE_PROGRESS",
              payload: {
                file,
                progress,
              },
            });
          },
        })
        .then((res) => {
          dispatch({
            type: "FILE_SUCCESS",
            payload: {
              file,
              id: res.data._id,
              url: res.data.url,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: "FILE_ERROR",
            payload: {
              err,
              file,
            },
          });
        });
    });
  };
}

export function deleteFile(id) {
  return async (dispatch, getState) => {
    api.delete(`/posts/${id}`).then(() =>
      dispatch({
        type: "DELETE_FILE",
        payload: {
          id,
        },
      })
    );
  };
}

export function uploadInitial() {
  return async (dispatch, getState) => {
    api.get("/posts").then((res) => {
      const updatedFiles = res.data.map((file) => ({
        file,
        name: file.name,
        preview: file.url,
        id: file._id,
        readableSize: filesize(file.size),
        progress: 100,
        uploaded: true,
        error: null,
        url: file.url,
      }));
      dispatch({
        type: "INITIAL_UPLOAD",
        payload: {
          files: updatedFiles,
        },
      });
    });
  };
}
