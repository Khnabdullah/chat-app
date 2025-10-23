import axios from 'axios';

const BAD_WORDS = [
  'kutti','kaali','kaala','kalua','takla','takli','moti','mota','chota'
];

const TOXICITY_API_URL = 'http://127.0.0.1:5001/api/check-toxicity';

function containsBadWord(text) {
  if (!text) return false;
  const msg = text.toLowerCase();
  return BAD_WORDS.some(word => msg.includes(word));
}

export const checkToxicity = async (text) => {
  if (containsBadWord(text)) {
    return {
      is_toxic: true,
      scores: { blacklist: true }
    };
  }
  try {
    const response = await axios.post(TOXICITY_API_URL, { text });
    return response.data;
  } catch (error) {
    console.error('Toxicity check failed:', error.message);
    return { is_toxic: false, scores: {} };
  }
};
