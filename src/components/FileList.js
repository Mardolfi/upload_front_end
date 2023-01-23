import { CircularProgressbar } from "react-circular-progressbar";
import { connect } from "react-redux";
import styled from "styled-components";
import { deleteFile } from "../store/actions";
import { MdLink, MdCheckCircle, MdError } from "react-icons/md";

function FileList({ files, removeFile }) {
  return (
    <>
      {files.length > 0 && (
        <Container>
          {files.map((file) => (
            <File key={file.id}>
              <FileInfo>
                <Preview src={file.preview} />
                <FileName>
                  <p>{file.name}</p>
                  <div>
                    <span>{file.readableSize}</span>
                    {!file.error && (
                      <button onClick={() => removeFile(file.id)}>
                        Excluir
                      </button>
                    )}
                  </div>
                </FileName>
              </FileInfo>
              <ActionControl>
                {file.url && (
                  <a
                    href={file.url}
                    target={"_blank"}
                    rel={"noopener noreffer"}
                  >
                    <MdLink size={24} color={"#222"} />
                  </a>
                )}
                {!file.uploaded && !file.error ? (
                  <CircularProgressbar
                    strokeWidth={10}
                    styles={{
                      root: { width: 24 },
                      path: { stroke: "#7159c1" },
                    }}
                    value={file.progress}
                  />
                ) : (
                  <>
                    {file.error && <MdError size={24} color={"#e57878"} />}
                    {file.uploaded && (
                      <MdCheckCircle size={24} color={"#78e5d5"} />
                    )}
                  </>
                )}
              </ActionControl>
            </File>
          ))}
        </Container>
      )}
    </>
  );
}

const ActionControl= styled.div`
  display: flex;
  gap: 5px;
`

const File = styled.div`
  padding: 0px 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const FileName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-weight: bolder;
    color: #333;
  }

  span {
    color: #999;
  }

  button {
    background: none;
    border: none;
    color: #e57878;
    cursor: pointer;
    opacity: 0.9;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }
  }

  div {
    display: flex;
    gap: 5px;
  }
`;

const FileInfo = styled.div`
  display: flex;
  gap: 5px;
  font-size: 0.8rem;
  align-items: center;
`;

const Preview = styled.div`
  width: 40px;
  height: 40px;
  background-image: ${(props) => `url(${props.src})`};
  background-position: center;
  border-radius: 8px;
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const mapStateToProps = (state) => {
  return {
    files: state.files.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFile: (id) => {
      dispatch(deleteFile(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
