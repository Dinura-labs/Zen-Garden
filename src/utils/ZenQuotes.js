// AI-Generated Zen and Vedic Quotes Database
export const zenQuotes = [
    {
        text: "සබ්බේ තසන්ති දණ්ඩස්ස, සබ්බේ භායන්ති මච්චුනෝ - සියල්ලෝම දඬුවමට තැති ගනිති. සියල්ලෝම මරණයට බිය වෙති.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "මනෝපුබ්බංගමා ධම්මා, මනෝසෙට්ඨා මනෝමයා - සියලු ධර්මයන්ට සිත පෙරටු වේ. සිතම ශ්‍රේෂ්ඨ වේ.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "නත්ථි සන්ති පරං සුඛං - නිවනට වඩා උතුම් සැපයක් නැත.",
        category: "Buddha Vachana",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "අප්පමාදෝ අමතපදං - අප්‍රමාදය නිවනට මඟයි.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "ධම්මෝ හවේ රක්ඛති ධම්මචාරී - ධර්මයේ හැසිරෙන්නා ධර්මය විසින්ම රකිනු ලබයි.",
        category: "Buddha Vachana",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "සබ්බ පාපස්ස අකරණං, කුසලස්ස උපසම්පදා - සියලු පව් නොකිරීමද, කුසල් රැස් කිරීමද උතුම්ය.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "නහි වේරේන වේරානි, සම්මන්තීධ කුදාචනං - වෛරයෙන් වෛරය නොසංසිඳේ. නොවෛරයෙන්ම වෛරය සංසිඳේ.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "ආරෝග්‍යා පරමා ලාභා, සන්තුට්ඨි පරමං ධනං - නිරෝගීකම පරම ලාභයයි. සතුට පරම ධනයයි.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "අත්තාහි අත්තනෝ නාථෝ - තමාට පිහිට තමාමය.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
    },
    {
        text: "උට්ඨානවතෝ සතිමතෝ - උත්සාහවන්තයාටත්, සිහි බුද්ධිය ඇත්තාටත් ජය ලැබේ.",
        category: "Dhammapada",
        author: "ගෞතම බුදුරජාණන් වහන්සේ"
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
