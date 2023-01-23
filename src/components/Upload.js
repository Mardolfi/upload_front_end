import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { uploadFile, uploadInitial } from "../store/actions";
import { v4 } from "uuid";
import { filesize } from "filesize";
import { useEffect } from "react";

function Upload({ fileUpload, initialUpload }) {

  useEffect(() => {
    initialUpload();
  }, [])

  return (
    <Dropzone
      accept={{ "image/png": [".png"], "image/jpeg": [".jpeg"] }}
      onDropAccepted={(files) => {
        const updatedFiles = files.map((file) => ({
          file,
          name: file.name,
          preview: URL.createObjectURL(file),
          id: v4(),
          readableSize: filesize(file.size),
          progress: 0,
          uploaded: false,
          error: null,
          url: null,
        }));

        fileUpload(updatedFiles);
      }}
    >
      {({ getInputProps, getRootProps, isDragAccept, isDragReject }) => (
        <DropContainer
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragAccept || isDragReject ? (
            <>
              {isDragAccept && <p>Manda brasa meu parceiro!</p>}
              {isDragReject && <p>Arquivo não suportado :(</p>}
            </>
          ) : (
            <p>Solte os arquivos aqui...</p>
          )}
        </DropContainer>
      )}
    </Dropzone>
  );
}

const dragActive = css`
  border-color: #78e5d5;
  color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
  color: #e57878;
`;

const DropContainer = styled.div`
  border: 1px dashed #999;
  cursor: pointer;
  border-radius: 8px;
  padding: 12px;
  min-width: 400px;
  text-align: center;
  color: #999;
  transition: 0.3s;
  ${(props) => props.isDragAccept && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: (files) => {
      dispatch(uploadFile(files));
    },
    initialUpload: () => {
      dispatch(uploadInitial())
    }
  };
};

export default connect("", mapDispatchToProps)(Upload);
