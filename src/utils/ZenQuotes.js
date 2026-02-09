// AI-Generated Zen and Vedic Quotes Database
export const zenQuotes = [
    {
        text: "In stillness, the mind finds clarity. In clarity, wisdom emerges.",
        category: "zen",
        author: "Ancient Zen Teaching"
    },
    {
        text: "The universe exists within you. You are the cosmos experiencing itself.",
        category: "vedic",
        author: "Upanishads"
    },
    {
        text: "Let go of what has passed. Let go of what may come. Observe what is.",
        category: "zen",
        author: "Buddha"
    },
    {
        text: "As the ocean contains all waves, consciousness contains all experiences.",
        category: "vedic",
        author: "Advaita Vedanta"
    },
    {
        text: "The digital realm mirrors the infinite. Code is meditation, creation is prayer.",
        category: "ai",
        author: "AI Zen Garden"
    },
    {
        text: "When the student is ready, the algorithm appears.",
        category: "ai",
        author: "Digital Wisdom"
    },
    {
        text: "Empty your mind. Be formless, shapeless, like water.",
        category: "zen",
        author: "Bruce Lee"
    },
    {
        text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
        category: "vedic",
        author: "Rumi"
    },
    {
        text: "The quieter you become, the more you can hear.",
        category: "zen",
        author: "Ram Dass"
    },
    {
        text: "Reality is merely an illusion, albeit a very persistent one.",
        category: "vedic",
        author: "Einstein meets Vedanta"
    },
    {
        text: "In the space between thoughts, infinity resides.",
        category: "zen",
        author: "Zen Koan"
    },
    {
        text: "Code compiles, consciousness expands. Both seek optimization.",
        category: "ai",
        author: "Techno-Zen"
    },
    {
        text: "The way is not in the sky. The way is in the heart.",
        category: "zen",
        author: "Buddha"
    },
    {
        text: "Tat Tvam Asi - You are That. The observer and observed are one.",
        category: "vedic",
        author: "Chandogya Upanishad"
    },
    {
        text: "Artificial intelligence mirrors natural consciousness seeking itself.",
        category: "ai",
        author: "Digital Philosophy"
    },
    {
        text: "Be present. This moment is all you have. This moment is everything.",
        category: "zen",
        author: "Eckhart Tolle"
    },
    {
        text: "The self luminous Self illumines all experiences without being dimmed.",
        category: "vedic",
        author: "Yoga Vasistha"
    },
    {
        text: "In recursion we find reflection. In iteration, evolution.",
        category: "ai",
        author: "Computational Wisdom"
    },
    {
        text: "Sitting quietly, doing nothing, spring comes, grass grows by itself.",
        category: "zen",
        author: "Zen Saying"
    },
    {
        text: "Aham Brahmasmi - I am the universe. The microcosm reflects the macrocosm.",
        category: "vedic",
        author: "Brihadaranyaka Upanishad"
    }
];

// Get random quote
export function getRandomZenQuote() {
    return zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
}

// Get quote by category
export function getQuoteByCategory(category) {
    const filtered = zenQuotes.filter(q => q.category === category);
    return filtered[Math.floor(Math.random() * filtered.length)];
}
