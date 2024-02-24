const mongoose = require("mongoose");
const first = [
  "Jasmine",
  "Connor",
  "Sophia",
  "Elijah",
  "Olivia",
  "Xavier",
  "Mia",
  "Gabriel",
  "Isabella",
  "Liam",
  "Ava",
  "Noah",
  "Emma",
  "Lucas",
  "Charlotte",
  "Aiden",
  "Harper",
  "Ethan",
  "Amelia",
  "Mason",
  "Evelyn",
  "Logan",
  "Emily",
  "Owen",
  "Abigail",
  "Jackson",
  "Chloe",
  "Carter",
  "Grace",
  "Caleb",
  "Madison",
  "Henry",
  "Zoe",
  "Benjamin",
  "Lily",
  "Samuel",
  "Scarlett",
  "Alexander",
  "Riley",
  "Victoria",
  "Daniel",
  "Penelope",
  "Matthew",
  "Natalie",
  "Julian",
  "Audrey",
  "David",
  "Layla",
  "Christopher",
  "Stella",
];

const last = [
  "Patel",
  "Mitchell",
  "Nguyen",
  "Thompson",
  "Smith",
  "Rodriguez",
  "Johnson",
  "Brown",
  "Kim",
  "Jones",
  "Martinez",
  "White",
  "Garcia",
  "Lee",
  "Williams",
  "Jackson",
  "Davis",
  "Wilson",
  "Taylor",
  "Thomas",
  "Hernandez",
  "Robinson",
  "Clark",
  "Lewis",
  "Moore",
  "Walker",
  "Adams",
  "Turner",
  "Stewart",
  "King",
  "Baker",
  "Green",
  "Carter",
  "Hill",
  "Cooper",
  "Morales",
  "Hall",
  "Reed",
  "Rogers",
  "Foster",
  "Perry",
  "Brooks",
  "Ward",
  "Ramirez",
  "Coleman",
  "Long",
  "Price",
  "Richardson",
  "Barnes",
  "Murphy",
];

const thoughts = [
  "Coffee = survival juice ☕",
  "Sunsets make everything better.",
  "Lost in a book's world 📚",
  "Current mood: Netflix & snacks 🍿",
  "Wanderlust hitting hard ✈️",
  "Embracing the chaos 🌀",
  "Feeling grateful for small wins.",
  "Music = therapy 🎶",
  "Self-care isn't selfish 💆‍♂️",
  "Living for the weekend vibes.",
  "Dreaming of beach days 🏖️",
  "Monday, we meet again 😴",
  "In need of a digital detox 📵",
  "Trusting the journey 🌟",
  "Kindness is contagious 💖",
  "Making memories, not excuses.",
  "Adventure awaits 🗺️",
  "Keepin' it real, always.",
  "Laughter is the best medicine 😂",
  "Ready for new beginnings 🌱",
  "Time to adult... reluctantly.",
  "Overthinking? Yup, guilty 🤔",
  "Dancing through life 💃",
  "Procrastination level: expert 🙈",
  "Today's goal: find joy in small things.",
  "Grateful for good friends 👯‍♂️",
  "Procaffeinating: delaying life until coffee is consumed.",
  "Positive vibes only ✌️",
  "Living that #blessed life 🙏",
  "Sparkle wherever you go ✨",
  "Learning to let go 🎈",
  "Weekend warrior mode activated 💪",
  "Sun-kissed and salty hair 🌞",
  "Not all who wander are lost 🌍",
  "Making magic happen ✨",
  "Reality called, I hung up.",
  "Growing pains lead to growth 🌱",
  "Finding beauty in simplicity.",
  "Plot twist: life is unpredictable.",
  "Daydreaming about faraway places ✈️",
  "Ready for a fresh start 🌅",
  "Slaying one day at a time.",
  "Embracing imperfections 🌟",
  "Staying grateful, staying grounded.",
  "Adventure is out there 🚀",
  "Taking life one cup of coffee at a time.",
  "Rainy days call for cozy reads 📖",
  "Trusting the timing of my life ⏳",
  "Breathe. It's just a bad day, not a bad life.",
  "Finding joy in the little things.",
];

const reactions = [
  "Wow!",
  "Cool!",
  "Nice!",
  "Love it!",
  "Amazing!",
  "Awesome!",
  "LOL!",
  "Yay!",
  "So true!",
  "Cute!",
  "Impressive!",
  "Great!",
  "Funny!",
  "Interesting!",
  "OMG!",
  "Adorable!",
  "Fantastic!",
  "Brilliant!",
  "Haha!",
  "Perfect!",
  "Sweet!",
  "Nailed it!",
  "Super!",
  "Beautiful!",
  "Bravo!",
  "Congrats!",
  "Yasss!",
  "Fun!",
  "Fabulous!",
  "Woot!",
  "Lit!",
  "Genius!",
  "Spot on!",
  "Cheers!",
  "Aww!",
  "Exciting!",
  "Clever!",
  "Woohoo!",
  "Precious!",
  "Impressive!",
  "Kudos!",
  "Thrilling!",
  "Iconic!",
  "Stellar!",
  "Top!",
  "Rad!",
  "Hooray!",
  "Excellent!",
  "Delightful!",
  "Remarkable!",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () => getRandomArrItem(first) + " " + getRandomArrItem(last);

const getRandomThoughts = (int, thoughtIdArray, username) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      _id: thoughtIdArray[i],
      thoughtText: getRandomArrItem(thoughts),
      username: username,
      reactions: [...getThoughtReactions(3)],
    });
  }
  return results;
};

const getThoughtReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(reactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomName(),
      reactionId: new mongoose.Types.ObjectId()
    });``
  }
  return results;
};

module.exports = { getRandomName, getRandomThoughts };