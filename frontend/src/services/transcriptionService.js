import axios from "axios";

const transcribeUrl = "http://127.0.0.1:8000/transcribe/"

async function transcribeAudioFromFile(audioTitle) {  
  try {
    console.log("Transcribing:", audioTitle);

    const response = await axios.post(transcribeUrl, null, { params: { title: audioTitle } }); // Initiate transcription
    if (response) {
      console.log("Transcription successful:", audioTitle);
      console.log("Response:", response);
    }

  } catch (error) {
    console.error("Transcription failed for:", audioTitle, error);
    return null;
  }
} export { transcribeAudioFromFile };



async function transcribeAudioFromLink(audioTitle) {
  audioTitle = `${audioTitle}.mp3`; // Add file extension to Youtube title

  try {
    console.log("Transcribing:", audioTitle);

    const response = await axios.post(transcribeUrl, null, { params: { title: audioTitle } }); // Initiate transcription
    if (response) {
      console.log("Response:", response.data);
      console.log("Transcription successful:", audioTitle);
    }

  } catch (error) {
    console.error("Transcription failed for:", audioTitle, error);
    return null;
  }
} export { transcribeAudioFromLink };



async function getTranscriptionResult() {
  try {
    const response = await axios.get(transcribeUrl); // Get transcription result

    if (response.data && response.data.transcript) {
      // console.log("Transcript:", response.data.transcript);
      return response.data.transcript;
    } else {
      console.log("No transcript available");
      return null;
    }
  } catch (error) {
    console.error("Failed to get transcription result", error);
    return null;
  }
} export { getTranscriptionResult };  

