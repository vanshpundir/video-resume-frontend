import React, { useState } from "react";
import "./App.css";
import { Navbar, Container, FormControl, Button, InputGroup, Card, Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap

function FileList() {
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null); // State to store the video preview URL
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);

    // Preview the first selected video file (if any)
    if (event.target.files.length > 0) {
      const videoURL = URL.createObjectURL(event.target.files[0]);
      setVideoPreview(videoURL);
    }
  };

  const handleUpload = () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("videos", selectedFiles[i]);
    }

    setIsLoading(true); // Set loading to true when starting the upload

    // Send a POST request to your API with the selected files
    fetch("http://localhost:8888/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by score in descending order
        const sortedData = data.filename.map((filename, index) => ({
          filename,
          score: data.score[index],
        })).sort((a, b) => b.score - a.score);

        setData(sortedData);
        setIsLoading(false); // Set loading to false when the response is received
      });
  };

  return (
    <div className="file-list">
      <Container>
        <div className="left-panel">
          <img className="left-image" src="https://i.gifer.com/7eK3.gif" alt="Left Image" />
        </div>

        <div className="nav">
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand>
                Video Resume Ranker
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        <div className="right-panel">

          {videoPreview && (
            <div className="video-container">
              <video
                width="50%" // Set the width to occupy the full right panel width
                height="500px" // Set the height to occupy 50vh (half of the screen height)
                controls
                src={videoPreview}
                style={{ marginBottom: "60px", alignItems: "center" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <InputGroup className="mb-3">

            <FormControl
              type="file"
              id="file-input"
              multiple
              onChange={handleFileChange}
            />
            <Button variant="primary" onClick={handleUpload}>Upload</Button>

          </InputGroup>
          {isLoading ? ( // Render a loading spinner while isLoading is true
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            data.map((item, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{item.filename}</Card.Title>
                  <Card.Text>
                    Score: {item.score}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default FileList;
