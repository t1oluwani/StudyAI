import axios from "axios";

const transcribeUrl = "http://127.0.0.1:8000/transcribe/"

async function transcribeAndStoreAudioFromFile(audioTitle) {  
  try {
    console.log("Transcribing and Storing:", audioTitle);
    const response = await axios.post(transcribeUrl, null, { params: { title: audioTitle } }); // Initiate transcription

    if (response) {
      console.log("Transcription and Storage successful:", audioTitle);
    }
  } catch (error) {
    alert("Transcription And Storage Failed!");
    console.error("Transcription and Storage failed for:", audioTitle, error);
    return null;
  }
} export { transcribeAndStoreAudioFromFile };



async function transcribeAndStoreAudioFromLink(audioTitle) {
  audioTitle = `${audioTitle}.mp3`; // Add file extension to Youtube title
  try {
    console.log("Transcribing and Storing:", audioTitle);

    const response = await axios.post(transcribeUrl, null, { params: { title: audioTitle } }); // Initiate transcription
    if (response) {
      console.log("Transcription and Storage successful:", audioTitle);
    }
  } catch (error) {
    alert("Transcription And Storage Failed!");
    console.error("Transcription and Storage failed for:", audioTitle, error);
    return null;
  }
} export { transcribeAndStoreAudioFromLink };



async function getTranscriptionResult() {
  try {
    const response = await axios.get(transcribeUrl); // Get transcription result

    if (response.data && response.data.transcript) {
      return response.data.transcript;
    } else { 
      return null; 
    }
  } catch (error) {
    alert("Could Not Get Transcription!");
    console.error("Failed to get transcription result", error);
    return null;
  }
} export { getTranscriptionResult };  

