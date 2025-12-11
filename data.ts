import { Lesson, Tab, SourceVocabLesson, SourcePhraseLesson, ExerciseLesson, ExerciseItem } from './types';

// Map for translations since source JSON is only English
const TRANSLATIONS: Record<string, string> = {
  // Food & Drinks
  "eat": "comer", "drink": "beber",
  "apple": "maçã", "banana": "banana", "orange": "laranja", "bread": "pão", "rice": "arroz",
  "water": "água", "juice": "suco", "milk": "leite", "tea": "chá", "coffee": "café",
  
  // Colors & School
  "like": "gostar", "have": "ter",
  "red": "vermelho", "blue": "azul", "green": "verde", "yellow": "amarelo", "black": "preto", "white": "branco",
  "pencil": "lápis", "pen": "caneta", "notebook": "caderno", "eraser": "borracha", "ruler": "régua", "backpack": "mochila",

  // Study & Work
  "study": "estudar", "work": "trabalhar",
  "math": "matemática", "english": "inglês", "science": "ciências", "history": "história", "geography": "geografia",
  "teacher": "professor", "doctor": "médico", "nurse": "enfermeira", "driver": "motorista", "engineer": "engenheiro",

  // Speak & Play
  "speak": "falar", "play": "jogar/tocar",
  "spanish": "espanhol", "french": "francês", "german": "alemão",
  "soccer": "futebol", "basketball": "basquete", "tennis": "tênis",
  "guitar": "violão", "piano": "piano", "drums": "bateria",
  "chess": "xadrez", "checkers": "damas", "cards": "cartas",

  // Want & Go
  "want": "querer", "go": "ir",
  "to buy": "comprar", "to sell": "vender", "to sleep": "dormir",
  "a dog": "um cachorro", "a cat": "um gato", "a hamster": "um hamster", "a book": "um livro", "a computer": "um computador",
  "a car": "um carro", "a bike": "uma bicicleta", "an ice cream": "um sorvete", "groceries": "compras de mercado",
  "home": "casa", "downtown": "centro da cidade", "school": "escola", "bed": "cama", "church": "igreja", "prison": "prisão",
  "beach": "praia", "park": "parque", "mall": "shopping", "walk": "caminhada", "abroad": "exterior", "fishing": "pescaria",

  // Phrases - Food & Drinks
  "I eat rice every day.": "Eu como arroz todos os dias.",
  "You eat bread in the morning.": "Você come pão de manhã.",
  "He eats an apple.": "Ele come uma maçã.",
  "She eats bananas.": "Ela come bananas.",
  "We eat together.": "Nós comemos juntos.",
  "They eat fast food.": "Eles comem fast food.",
  "I don't drink milk.": "Eu não bebo leite.",
  "He doesn't eat sugar.": "Ele não come açúcar.",
  "We don't drink soda.": "Nós não bebemos refrigerante.",
  "Do you eat vegetables?": "Você come vegetais?",
  "Does she drink coffee?": "Ela bebe café?",
  "Do they drink water?": "Eles bebem água?",

  // Phrases - Colors
  "I like red.": "Eu gosto de vermelho.",
  "You like blue.": "Você gosta de azul.",
  "He likes green.": "Ele gosta de verde.",
  "She likes yellow.": "Ela gosta de amarelo.",
  "We like black.": "Nós gostamos de preto.",
  "They like white.": "Eles gostam de branco.",
  "I don't have a pencil.": "Eu não tenho um lápis.",
  "He doesn't have a backpack.": "Ele não tem uma mochila.",
  "They don't have notebooks.": "Eles não têm cadernos.",
  "Do you like this color?": "Você gosta desta cor?",
  "Does she have a ruler?": "Ela tem uma régua?",
  "Do they have pens?": "Eles têm canetas?",

  // Phrases - Study
  "I study English.": "Eu estudo inglês.",
  "You study math.": "Você estuda matemática.",
  "He studies science.": "Ele estuda ciências.",
  "She studies history.": "Ela estuda história.",
  "We study together.": "Nós estudamos juntos.",
  "They study geography.": "Eles estudam geografia.",
  "I work at a school.": "Eu trabalho em uma escola.",
  "He works at a hospital.": "Ele trabalha em um hospital.",
  "They work downtown.": "Eles trabalham no centro.",
  "I don't work on weekends.": "Eu não trabalho nos fins de semana.",
  "She doesn't study music.": "Ela não estuda música.",
  "Do you study geography?": "Você estuda geografia?",
  "Does he work here?": "Ele trabalha aqui?",

  // Phrases - Speak
  "I speak English.": "Eu falo inglês.",
  "You speak Spanish.": "Você fala espanhol.",
  "He speaks French.": "Ele fala francês.",
  "She speaks German.": "Ela fala alemão.",
  "We speak different languages.": "Nós falamos línguas diferentes.",
  "They speak very well.": "Eles falam muito bem.",
  "I play soccer.": "Eu jogo futebol.",
  "He plays guitar.": "Ele toca violão.",
  "They play chess.": "Eles jogam xadrez.",
  "I don't speak Italian.": "Eu não falo italiano.",
  "She doesn't play piano.": "Ela não toca piano.",
  "Do you play basketball?": "Você joga basquete?",
  "Does he speak English?": "Ele fala inglês?",

  // Phrases - Want
  "I want a dog.": "Eu quero um cachorro.",
  "You want ice cream.": "Você quer sorvete.",
  "He wants a new computer.": "Ele quer um computador novo.",
  "She wants a bike.": "Ela quer uma bicicleta.",
  "We want to buy groceries.": "Nós queremos fazer compras.",
  "They want a car.": "Eles querem um carro.",
  "I go to school.": "Eu vou para a escola.",
  "He goes to the mall.": "Ele vai ao shopping.",
  "They go to the beach.": "Eles vão à praia.",
  "I don't want a cat.": "Eu não quero um gato.",
  "He doesn't go downtown.": "Ele não vai ao centro.",
  "Do you want a book?": "Você quer um livro?",
  "Does she go home?": "Ela vai para casa?"
};

const getTranslation = (text: string): string => {
  return TRANSLATIONS[text] || text;
};

// Raw JSON Data
const RAW_VOCAB = {
  "lessons": [
    {
      "id": 1,
      "title": "Food & Drinks",
      "verbs": ["eat", "drink"],
      "vocabulary": [
        "apple", "banana", "orange", "bread", "rice",
        "water", "juice", "milk", "tea", "coffee"
      ]
    },
    {
      "id": 2,
      "title": "Colors & School Supplies",
      "verbs": ["like", "have"],
      "vocabulary": [
        "red", "blue", "green", "yellow", "black", "white",
        "pencil", "pen", "notebook", "eraser", "ruler", "backpack"
      ]
    },
    {
      "id": 3,
      "title": "Study & Work",
      "verbs": ["study", "work"],
      "vocabulary": [
        "math", "english", "science", "history", "geography",
        "teacher", "doctor", "nurse", "driver", "engineer"
      ]
    },
    {
      "id": 4,
      "title": "Speak & Play",
      "verbs": ["speak", "play"],
      "vocabulary": [
        "english", "spanish", "french", "german",
        "soccer", "basketball", "tennis",
        "guitar", "piano", "drums",
        "chess", "checkers", "cards"
      ]
    },
    {
      "id": 5,
      "title": "Want & Go",
      "verbs": ["want", "go"],
      "vocabulary": [
        "to buy", "to sell", "to sleep",
        "a dog", "a cat", "a hamster", "a book", "a computer",
        "a car", "a bike", "an ice cream", "groceries",
        "home", "downtown", "school", "bed", "church", "prison",
        "beach", "park", "mall", "walk", "abroad", "fishing"
      ]
    }
  ]
};

const RAW_PHRASES = {
  "lessons": [
    {
      "id": 1,
      "title": "Food & Drinks",
      "phrases": [
        "I eat rice every day.",
        "You eat bread in the morning.",
        "He eats an apple.",
        "She eats bananas.",
        "We eat together.",
        "They eat fast food.",
        "I don't drink milk.",
        "He doesn't eat sugar.",
        "We don't drink soda.",
        "Do you eat vegetables?",
        "Does she drink coffee?",
        "Do they drink water?"
      ]
    },
    {
      "id": 2,
      "title": "Colors & School Supplies",
      "phrases": [
        "I like red.",
        "You like blue.",
        "He likes green.",
        "She likes yellow.",
        "We like black.",
        "They like white.",
        "I don't have a pencil.",
        "He doesn't have a backpack.",
        "They don't have notebooks.",
        "Do you like this color?",
        "Does she have a ruler?",
        "Do they have pens?"
      ]
    },
    {
      "id": 3,
      "title": "Study & Work",
      "phrases": [
        "I study English.",
        "You study math.",
        "He studies science.",
        "She studies history.",
        "We study together.",
        "They study geography.",
        "I work at a school.",
        "He works at a hospital.",
        "They work downtown.",
        "I don't work on weekends.",
        "She doesn't study music.",
        "Do you study geography?",
        "Does he work here?"
      ]
    },
    {
      "id": 4,
      "title": "Speak & Play",
      "phrases": [
        "I speak English.",
        "You speak Spanish.",
        "He speaks French.",
        "She speaks German.",
        "We speak different languages.",
        "They speak very well.",
        "I play soccer.",
        "He plays guitar.",
        "They play chess.",
        "I don't speak Italian.",
        "She doesn't play piano.",
        "Do you play basketball?",
        "Does he speak English?"
      ]
    },
    {
      "id": 5,
      "title": "Want & Go",
      "phrases": [
        "I want a dog.",
        "You want ice cream.",
        "He wants a new computer.",
        "She wants a bike.",
        "We want to buy groceries.",
        "They want a car.",
        "I go to school.",
        "He goes to the mall.",
        "They go to the beach.",
        "I don't want a cat.",
        "He doesn't go downtown.",
        "Do you want a book?",
        "Does she go home?"
      ]
    }
  ]
};

// Transform to unified Lesson format
export const VOCAB_LESSONS: Lesson[] = RAW_VOCAB.lessons.map((l: SourceVocabLesson) => ({
  id: l.id,
  title: l.title,
  type: Tab.VOCABULARY,
  verbs: l.verbs,
  items: [
    ...l.verbs.map(v => ({ original: v, translation: getTranslation(v) })),
    ...l.vocabulary.map(v => ({ original: v, translation: getTranslation(v) }))
  ]
}));

export const PHRASE_LESSONS: Lesson[] = RAW_PHRASES.lessons.map((l: SourcePhraseLesson) => ({
  id: l.id,
  title: l.title,
  type: Tab.PHRASES,
  items: l.phrases.map(p => ({ original: p, translation: getTranslation(p) }))
}));

// --- Exercise Logic ---

// Common conjugations and variations
const VERB_FORMS: Record<string, string[]> = {
  "eat": ["eat", "eats", "eating", "ate"],
  "drink": ["drink", "drinks", "drinking", "drank"],
  "like": ["like", "likes", "liking", "liked"],
  "have": ["have", "has", "having", "had"],
  "study": ["study", "studies", "studying", "studied"],
  "work": ["work", "works", "working", "worked"],
  "speak": ["speak", "speaks", "speaking", "spoke"],
  "play": ["play", "plays", "playing", "played"],
  "want": ["want", "wants", "wanting", "wanted"],
  "go": ["go", "goes", "going", "went"],
  "buy": ["buy", "buys", "buying", "bought"],
  "sell": ["sell", "sells", "selling", "sold"],
  "sleep": ["sleep", "sleeps", "sleeping", "slept"]
};

// Helper to clean vocabulary (remove particles like 'to', 'a', 'an')
const cleanVocabItem = (item: string): string => {
  return item.replace(/^(to |a |an )/i, '').trim();
};

const generateExercises = (): ExerciseLesson[] => {
  return RAW_PHRASES.lessons.map(phraseLesson => {
    // 1. Get all potential target words (verbs + vocabulary) for this lesson
    const vocabLesson = RAW_VOCAB.lessons.find(v => v.id === phraseLesson.id);
    if (!vocabLesson) return { id: phraseLesson.id, title: phraseLesson.title, items: [] };

    // Create a list of target words to look for in sentences
    const targets = [
      ...vocabLesson.verbs.map(v => ({ word: v, isVerb: true })),
      ...vocabLesson.vocabulary.map(v => ({ word: cleanVocabItem(v), isVerb: false }))
    ];

    const items: ExerciseItem[] = [];

    // 2. Process each phrase
    phraseLesson.phrases.forEach(phrase => {
      // Find all matches for any target word
      const matches: { start: number; end: number; matchedText: string; }[] = [];

      targets.forEach(target => {
        // Determine forms to check
        let forms: string[] = [];
        if (target.isVerb && VERB_FORMS[target.word]) {
          forms = VERB_FORMS[target.word];
        } else {
          // Simple pluralization/variation for nouns/others
          forms = [target.word, target.word + 's', target.word + 'es'];
          if (target.word.endsWith('y')) {
             forms.push(target.word); // e.g. "grocery" 
             // Very basic heuristic for plurals not in our simple list
             forms.push(target.word.slice(0, -1) + 'ies'); 
          }
        }

        forms.forEach(form => {
            // Regex for whole word match, case insensitive
            const regex = new RegExp(`\\b${form}\\b`, 'gi');
            let match;
            while ((match = regex.exec(phrase)) !== null) {
                matches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    matchedText: match[0]
                });
            }
        });
      });

      // 3. Select a match to be the gap
      if (matches.length > 0) {
        // Sort by length desc to prefer longer matches (e.g. "ice cream" over "ice")
        matches.sort((a, b) => b.matchedText.length - a.matchedText.length);
        
        // Pick one randomly to vary the exercises each time the app loads
        // or just pick the first valid one if we want consistency.
        // Let's pick randomly from top matches to add variety if a sentence has multiple key terms.
        const selected = matches[Math.floor(Math.random() * matches.length)];

        const pre = phrase.substring(0, selected.start);
        const post = phrase.substring(selected.end);
        
        items.push({
          id: `${phraseLesson.id}-${phrase}-${selected.start}`,
          parts: [pre, post],
          answer: selected.matchedText, // The exact word found in text
          fullPhrase: phrase,
          translation: getTranslation(phrase)
        });
      }
    });

    return {
      id: phraseLesson.id,
      title: phraseLesson.title,
      items
    };
  });
};

export const EXERCISE_LESSONS: ExerciseLesson[] = generateExercises();