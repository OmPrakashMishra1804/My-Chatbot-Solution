export async function getChatResponse(messages) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  if (lastMessage.includes('tulsi') || lastMessage.includes('basil')) {
    return "Ah, the Holy Basil, or 'Tulsi' (*Ocimum sanctum*). Known as the 'Queen of Herbs', it is revered for its ability to balance the nervous system and clear the respiratory tract. One might use it in a tea to sharpen the mind or reduce stress.";
  }
  
  if (lastMessage.includes('neem')) {
    return "Neem (*Azadirachta indica*), the 'Village Pharmacy'. This bitter tree is a supreme blood purifier and skin healer. In Ayurveda, it is cooling for Pitta and drying for Kapha. Its leaves are traditionally used to treat skin conditions and boost immunity.";
  }

  if (lastMessage.includes('ashwagandha')) {
    return "Ashwagandha (*Withania somnifera*), the 'Strength of a Horse'. It is the premier Ayurvedic adaptogen. It balances Vata and Kapha while building 'Ojas' (vitality). It is perfect for those seeking better sleep, reduced cortisol, and physical endurance.";
  }
  
  if (lastMessage.includes('dosha') || lastMessage.includes('vata') || lastMessage.includes('pitta') || lastMessage.includes('kapha')) {
    return "The Doshas—Vata, Pitta, and Kapha—are the biological energies found throughout the human body and mind. It sounds like you are curious about your Prakriti. To find balance, we must observe your current state (Vikriti). Tell me, are you feeling more heat, dryness, or heaviness lately?";
  }
  
  if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return "Greetings, seeker of wellness. I am the Ayurvedic Sage, custodian of ancient herbology. How may I guide your path toward harmony and balance today?";
  }

  // Reflection
  const keywords = lastMessage.split(' ').filter(word => word.length > 5);
  const reflection = keywords.length > 0 ? `Your mention of ${keywords[0]} is a significant path. ` : "";
  return `${reflection}In the vast forest of Ayurvedic knowledge, your path leads toward greater harmony. To offer precise guidance, could you share more about your current energy levels or digestive state?`;
}
