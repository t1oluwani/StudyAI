import axios from "axios";

const transcribeUrl = "http://127.0.0.1:8000/transcribe/"

async function transcribeAudioFromFile(audioTitle) {  
  try {
    console.log("Transcribing:", audioTitle);

    await axios.post(transcribeUrl, null, { params: { title: audioTitle } }); // Initiate transcription

    // Debbuging Start
    const response = await axios.get(transcribeUrl, { params: { title: audioTitle } }); // Get transcription result
    if (response.data && response.data.length > 0) {
      console.log("Transcript:", response.data[0].transcript);
      console.log("Transcription successful:", audioTitle);
      return response.data[0].transcript;
    } else {
      console.log("No transcript available for:", audioTitle);
      return null;
    }
    // Debbuging End

  } catch (error) {
    console.error("Transcription failed for:", audioTitle, error);
    return null;
  }
} export { transcribeAudioFromFile };

async function transcribeAudioFromLink(audioTitle) {
  audioTitle = `${audioTitle}.mp3`; // Add file extension to Youtube title

  try {
    console.log("Transcribing:", audioTitle);

    // await axios.post(transcribeUrl, null, { params: { title: audioTitle } }); // Initiate transcription

    // Debbuging Start
    const response = await axios.get(transcribeUrl); // Get transcription result

    if (response.data && response.data.transcript) {
      console.log("Transcript:", response.data.transcript);
      console.log("Transcription successful:", audioTitle);
      return response.data.transcript;
      
    } else {
      console.log("No transcript available for:", audioTitle);
      return null;
    }
    // Debbuging End

  } catch (error) {
    console.error("Transcription failed for:", audioTitle, error);
    return null;
  }
} export { transcribeAudioFromLink };

