import axios from 'axios';

const openAIServiceUrl = "http://127.0.0.1:8000/chat/"

async function getOpenAIResponse(context, message) {
  try {
    const response = await axios.post(openAIServiceUrl, null, { params: { prevContext: context, currMessage: message } });

    if (response.data && response.data.response) {
      return response.data.response;
    } else { 
      return null; 
    }
  } catch (error) {
    console.error("Failed to get OpenAI response", error);
    return null;
  }
}