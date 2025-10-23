import axios from 'axios';

// Add your Indian bad words here (in lowercase) - extend as needed!
const BAD_WORDS = [
  'madarchod', 'bhosadike', 'bhenchod', 'betichod', 'bhadhava', 
  'chodu', 'chutiya','chutiye', 'gaand', 'gaandu', 'gadha', 'bakland', 
  'lauda', 'lund', 'hijra', 'kuttiya', 'paad', 'randi', 'saala kutta', 
  'saali kutti', 'tatti', 'kamina', 'chut ke pasine mein talay huye bhajiye', 
  'chut ke dhakkan', 'chut ke gulam', 'chutiya ka bheja ghas khane gaya hai', 
  'choot marani ka', 'choot ka baal', 'chipkali ke jhaat ke baal', 
  'chipkali ke jhaat ke paseene', 'chipkali ke gaand ke pasine', 
  'chipkali ke chut ke pasine', 'chipkali ki bhigi chut', 
  'chinaal ke gadde ke nipple ke baal ke joon', 'chullu bhar muth mein doob mar', 
  'cuntmama', 'chhed', 'apni gaand mein muthi daal', 'apni lund choos', 
  'apni ma ko ja choos', 'bhen ke laude', 'bhen ke takke', 
  'abla naari tera buble bhaari', 'bhonsri-waalaa', 'bhadwe ka awlat', 
  'bhains ki aulad', 'buddha khoosat', 'bol teri gand kaise maru', 
  'bur ki chatani', 'chunni', 'chinaal', 'chudai khana', 'chudan chuda', 
  'chut ka pujari', 'chut ka bhoot', 'gaand ka makhan', 'gaand main lassan', 
  'gaand main danda', 'gaand main keera', 'gaand mein bambu', 'gaandfat', 
  'pote kitne bhi bade ho lund ke niche hi rehte hai', 'hazaar lund teri gaand main', 
  'jhat ke baal', 'jhaant ke pissu', 'kadak mall', 'kali choot ke safaid jhaat', 
  'khotey ki aulda', 'kutte ka awlat', 'kutte ki jat', 'kutte ke tatte', 
  'kutte ke poot teri maa ki choot', 'lavde ke bal', 'lund chus', 
  'lund ke pasine', 'meri gand ka khatmal', 'moot', 'mootna', 
  'najayaz paidaish', 'rundi khana', 'sadi hui gaand', 'teri gaand main kute ka lund', 
  'teri maa ka bhosda', 'teri maa ki chut', 'tere gaand mein keede paday', 
  'ullu ke pathe'
];


const TOXICITY_API_URL = 'http://127.0.0.1:5001/api/check-toxicity';

function containsBadWord(text) {
  if (!text) return false;
  const msg = text.toLowerCase();
  return BAD_WORDS.some(word => msg.includes(word));
}

export const checkToxicity = async (text) => {
  // Check custom blacklist first
  if (containsBadWord(text)) {
    return {
      is_toxic: true,
      scores: { blacklist: true }
    };
  }
  try {
    const response = await axios.post(TOXICITY_API_URL, { text });
    // Optionally, you could ALSO check after the model, but before is enough
    return response.data;
  } catch (error) {
    console.error('Toxicity check failed:', error.message);
    // Fail open (allow messages) if model fails
    return { is_toxic: false, scores: {} };
  }
};
