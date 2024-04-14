// import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function Dashboard() {
    // const navigate = useNavigate();
    const [file, setFile] = useState();
    const [dragging, setDragging] = useState(false);
    const [content, setContent] = useState();
    const [data, setData] = useState([]);
    const [summaries, setSummaries] = useState([]);
    const [keys, setKeys] = useState([]);
    //const [collapsedSummaries, setCollapsedSummaries] = useState([]);
    const [expandedSummaries, setExpandedSummaries] = useState({});
    const [collapsedSummaries, setCollapsedSummaries] = useState(Array(summaries.length).fill(true));

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const response = await fetch('/response.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            // Extract keys from the JSON object and set them in state
            const keys = Object.keys(jsonData);
            setKeys(keys);
            const summaries = keys.map(key => ({
                acceptance: (jsonData[key].Acceptance || '').trim(),
                assignee: (jsonData[key].Assignee || '').trim(),
                description: (jsonData[key].Description || '').trim(),
                epic: (jsonData[key]['Epic/Theme'] || '').trim(),
                label: (jsonData[key]['Labels/Tags'] || '').trim(),
                issue: (jsonData[key]['Linked Issues'] || '').trim(),
                priority: (jsonData[key].Priority || '').trim(),
                spoints: (jsonData[key]['Story Points'] || '').trim(),
                title: (jsonData[key].Title || '').trim(),
                summary: (jsonData[key].Summary || '').trim(),
            }));
            setSummaries(summaries);
            setCollapsedSummaries(Array(summaries.length).fill(true));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function showuserStories() {
        if (!file || !file.name) {
            alert("Please select a file to generate a story.");
            return;
        }
    
        if (summaries.length === 0) {
            alert("No data available. Please fetch data first.");
            return;
        }
        if (!Array.isArray(data)) {
            console.error("Data is not an array:", data);
            return;
        }
    
        var headingElement = document.getElementById("xyz");
        var htmlContent = "<ul>";
    
        summaries.forEach((summary,index,key) => {
            const currentKey = keys[index];
            // Add list item
            htmlContent += `<li style='list-style-type: none; margin-left: 0; padding-left: 0; text-align: left; margin-top:8px'><strong>${String(currentKey)}:</strong>${summaries[index].summary} </li>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}"><br>
                        <b><i>  See more...</b></i>
                        </button>
                    </h2>
                    <br>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                <div style="margin-left: 0; padding-left: 0; text-align: left" class="accordion-body">
                   <strong>Acceptance: </strong>${summaries[index].acceptance}<br>
                   <strong>Summary: </strong> ${JSON.stringify(summaries[index].summary)}<br>
                   <strong>Description: </strong>   ${summaries[index].description}<br>
                   <strong>Assignee: </strong>   ${summaries[index].assignee}<br>
                   <strong>Epic/Theme: </strong>   ${summaries[index].epic}<br>
                   <strong>Labels/Tags: </strong>   ${summaries[index].label}<br>
                   <strong>Linked Issues: </strong>   ${summaries[index].issue}<br>
                   <strong>Priority: </strong>   ${summaries[index].priority}<br>
                   <strong>Story Points: </strong>   ${summaries[index].spoints}<br>
                   <strong>Title: </strong>   ${summaries[index].title}<br>

                        </div>
                    </div>
                </div>
                <br>
            `;
        });
    
        htmlContent += "</ul>";
        headingElement.innerHTML = htmlContent;
    }
    
    const handleChange = (e) => {
        setContent(e.target.value);
    };

    function functionality(event) {
        event.preventDefault();
        try {
            if (!file || !file.name) {
                alert("Please select a file to generate a story.");
                return;
            }

            alert("Submitted file: " + file.name)
        } catch (error) {
            console.error('Error:', error);
            // Handle any errors here
        }
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
        headingElement.innerHTML = ""
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
                    <div id='xyz' style={{ height: '21rem', width: '35rem', backgroundColor: 'white', marginLeft: '3%', fontSize: '15px', overflowY: 'auto', overflowX: 'scroll', top: '50px' }}>
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