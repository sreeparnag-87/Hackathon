// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
function Dashboard() {
    // const navigate = useNavigate();
    const [file, setFile] = useState();
    const [dragging, setDragging] = useState(false);
    const [content, setContent] = useState();

    const handleChange = (e) => {
      setContent(e.target.value);
    };
  

    function functionality(event) {
        event.preventDefault();

        //     // Check if the fileInput element exists
        //     const fileInput = document.getElementById("fileInput");
        //     if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        //         alert("Please select a file to generate a story.");
        //         return;
        //     }

        //     const selectedFile = fileInput.files[0];
        // setFile(selectedFile);
        // alert("Submitted file: " + selectedFile.name);
        if (!file || !file.name) {
            alert("Please select a file to generate a story.");
            return;
        }
        alert("Submitted file: " + file.name)
    }
    function handleDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    }

    function handleFileInputChange(e) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    function showfunctionality() {
        const fileInput = document.getElementById("fileInput");
        if (!file || !file.name) {
            alert("Please select a file to generate a story.");
            return;
        }
        var headingElement = document.getElementById("xyz");
        // alert("Submitted file: " + file.name);
        // Modifying the content of the heading element
        headingElement.innerHTML =""
        
}

    function showuserStories() {
        const fileInput = document.getElementById("fileInput");
        if (!file || !file.name) {
            alert("Please select a file to generate a story.");
            return;
        }

        var headingElement = document.getElementById("xyz");
        // Modifying the content of the heading element
        headingElement.innerHTML =
            "Summary : User can log into their account <br/>" +
            "Description: as a user , i wnt to able to login to my account so that I can ";
    }

    function deleteFile() {
        setFile(null);
    }

    function downloadFile() {
        console.log("download");
        // Create an anchor element
        const anchor = document.createElement('a');
        // Set the href attribute to the URL of the file you want to download
        anchor.href = 'C:\Users\Lenovo\Desktop\my-app';
        // Set the download attribute to specify the filename
        anchor.download = 'filename.txt';
        // Append the anchor to the document body
        document.body.appendChild(anchor);
        // Click the anchor to trigger the download
        anchor.click();
        // Remove the anchor from the document body
        document.body.removeChild(anchor);
    }
    return (
        <div>
            <h2 style={{ marginRight: '70%', marginTop: '3%', marginLeft: '2%' }}> Upload Your BRD :</h2>
            <div style={{ backgroundColor: '#F5F5F5', width: '30%', height: '50PX', borderRadius: '20px', marginTop: '2%', marginLeft: '2%' }}
                class={`drag-drop-area ${dragging ? 'dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={() => setDragging(true)}
                onDragLeave={() => setDragging(false)}
            >
                {file ? (
                    <p>{file.name}  < HighlightOffOutlinedIcon onClick={deleteFile} /></p>
                ) : (
                    <div class="hello">
                        <label class="clevel"><CloudUploadOutlinedIcon />{dragging ? 'Drop file here' : ' Drag and drop file here'}</label>
                        <label for="fileInput" class="custom-file-input-label">Choose File</label>
                        <input type="file" id="fileInput" class="custom-file-input" onChange={handleFileInputChange} />
                    </div>
                )}
                <button type="submit" class="btn-violet" style={{
                    height: '40px', border: 'none', marginTop: '8%', borderRadius: '50px',
                    width: '100%', textSizeAdjust: '50px', fontWeight: 'bold'
                }} onClick={(e) => functionality(e)} >
                    Generate Story</button>

                <div style={{
                    backgroundColor: '#ececec', borderRadius: '20px', alignContent: 'center', marginTop: '-11rem',
                    marginLeft: '130%', width: '37rem', height: '25rem', marginBottom: '17rem'
                }}>
                    <button type="submit" class="btn-violet"
                        style={{ border: 'none', width: '17rem', borderRadius: '10px', fontWeight: 'bold' }}
                        onClick={(e) => showfunctionality()}>Functionality</button>

                    <button type="submit" class="btn-gray" style={{
                        border: 'none', marginBottom: '9px', borderRadius: '10px',
                        width: '17rem', marginLeft: '2px', fontWeight: 'bold'
                    }} onClick={(e) => showuserStories()}>User Stories</button>
                    <div id='xyz' style={{ height: '21rem', width: '35rem', backgroundColor: 'white', marginLeft: '3%', fontSize: '15px', overflowY: 'auto', top: '50px' }}>
                        <textarea
                            style={{ width: '100%', height: '100%', border: 'none', resize: 'none' }}
                            value={content}
                            onChange={handleChange}
                            readOnly 
                        />

                    </div>
                    <FileDownloadOutlinedIcon style={{ marginLeft: '80%', alignContent: 'end' }} onClick={downloadFile} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;