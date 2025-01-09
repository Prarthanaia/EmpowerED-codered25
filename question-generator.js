const fs = require('fs').promises;

async function generateQuestionsFromText(text) {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const questions = [];

  for (let i = 0; i < Math.min(sentences.length, 5); i++) {
    const sentence = sentences[i].trim();
    const words = sentence.split(/\s+/);
    const keywordIndex = Math.floor(Math.random() * words.length);
    const keyword = words[keywordIndex];

    const question = {
      question: `What is the correct word to fill in the blank: "${sentence.replace(keyword, '_____')}"?`,
      options: [keyword, "placeholder1", "placeholder2", "placeholder3"],
      correctAnswer: keyword
    };

    // Generate fake options
    for (let j = 1; j < 4; j++) {
      question.options[j] = words[Math.floor(Math.random() * words.length)];
    }

    // Shuffle options
    for (let j = question.options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [question.options[j], question.options[k]] = [question.options[k], question.options[j]];
    }

    questions.push(question);
  }

  return questions;
}

async function main() {
  try {
    const sampleText = `
      The quick brown fox jumps over the lazy dog. 
      AI technology is rapidly advancing and changing various industries. 
      Climate change is a global issue that requires immediate action. 
      The human brain is capable of processing vast amounts of information. 
      Learning a new language can improve cognitive function and cultural understanding.
    `;

    console.log("Sample text:");
    console.log(sampleText);

    console.log("\nGenerating questions...\n");

    const questions = await generateQuestionsFromText(sampleText);

    questions.forEach((q, index) => {
      console.log(`Question ${index + 1}:`);
      console.log(q.question);
      console.log("Options:");
      q.options.forEach((option, optionIndex) => {
        console.log(`${String.fromCharCode(97 + optionIndex)}) ${option}${option === q.correctAnswer ? ' (correct)' : ''}`);
      });
      console.log();
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

