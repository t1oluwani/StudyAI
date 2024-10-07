import axios from 'axios';

const audioFileUploadUrl = 'http://127.0.0.1:8000/upload-from-file/';
const youtubeAudioUploadUrl = "http://127.0.0.1:8000/upload-from-youtube/";

async function extractAudioFromFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    console.log("Extracting audio from:", file.name);
    const response = await axios.post(audioFileUploadUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    if (response !== undefined) {
      console.log("Audio extraction successful:", file.name);
      return response.data.audio_file;
    } else {
      console.log("Audio extraction unsuccessful:", file.name);
      alert("Audio Extraction Unsuccessful!");
      return null;
    }
  } catch (error) {
    alert("Audio Extraction Failed!");
    console.error(error);
  }
} export { extractAudioFromFile };

async function extractAudioFromLink(link) {
  try {
    console.log("Extracting audio from:", link);
    const response = await axios.post(youtubeAudioUploadUrl, null, { params: { url: link } })

    console.log("Audio extraction successful:", response.data.audio_file);
    return response.data.audio_file;
  } catch (error) {
    alert("Audio Extraction Failed!");
    console.error(error);
  }
} export { extractAudioFromLink };
