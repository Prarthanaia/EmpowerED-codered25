const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

function generateQuestions(text) {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const questions = [];

  sentences.forEach(sentence => {
    const tokens = tokenizer.tokenize(sentence);
    
    // Generate "What" questions
    const nouns = tokens.filter(token => /^[A-Z]/.test(token)); // Simple heuristic for nouns
    if (nouns.length > 0) {
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      const questionText = sentence.replace(new RegExp(`\\b${randomNoun}\\b`, 'i'), '______');
      questions.push({
        type: 'fillInTheBlank',
        question: `What is the missing word: ${questionText}`,
        answer: randomNoun,
      });
    }

    // Generate "Who" questions
    const properNouns = tokens.filter(token => /^[A-Z][a-z]+$/.test(token));
    if (properNouns.length > 0) {
      const randomProperNoun = properNouns[Math.floor(Math.random() * properNouns.length)];
      const questionText = sentence.replace(new RegExp(`\\b${randomProperNoun}\\b`, 'i'), '______');
      questions.push({
        type: 'fillInTheBlank',
        question: `Who is mentioned in this sentence: ${questionText}`,
        answer: randomProperNoun,
      });
    }

    // Generate "When" questions
    const timeWords = ['yesterday', 'today', 'tomorrow', 'year', 'month', 'week', 'day'];
    const timeTokens = tokens.filter(token => timeWords.includes(token.toLowerCase()));
    if (timeTokens.length > 0) {
      const randomTimeToken = timeTokens[Math.floor(Math.random() * timeTokens.length)];
      const questionText = sentence.replace(new RegExp(`\\b${randomTimeToken}\\b`, 'i'), '______');
      questions.push({
        type: 'fillInTheBlank',
        question: `When did this happen: ${questionText}`,
        answer: randomTimeToken,
      });
    }
  });

  return questions;
}

module.exports = { generateQuestions };

