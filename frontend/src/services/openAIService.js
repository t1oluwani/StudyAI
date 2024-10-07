import axios from 'axios';

const openAIChatUrl = "http://127.0.0.1:8000/chat/"

async function getOpenAIResponse(context, message) {
  try {
    console.log("Getting OpenAI response...");
    const response = await axios.post(openAIChatUrl, null, { params: { prevContext: context, currMessage: message } });

    if (response.data) {
      const extractedResponse = response.data[0];
      console.log("Successfully got OpenAI response");
      return extractedResponse;
    } else { 
      return null; 
    }
  } catch (error) {
    alert("Could Not Get OpenAI Response!");
    console.error("Failed to get OpenAI response", error);
    return null;
  }
} export { getOpenAIResponse };