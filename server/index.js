const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3004;

// Middleware
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample headlines
const headlines = [
    "Why {name} is {location}'s Top Choice in 2025",
    "Discover {location}'s Favorite {name} - Rated #1",
    "{name}: {location}'s Hidden Gem You Must Try",
    "The Secret Behind {name}'s Success in {location}",
    "{name} - Redefining Excellence in {location}",
    "Why Everyone in {location} is Talking About {name}",
    "{name}: The Best Kept Secret in {location}",
    "How {name} Became {location}'s Favorite Spot",
    "{name} - Setting New Standards in {location}",
    "The {location} Experience You Can't Miss at {name}"
];

// Generate random business data
const generateBusinessData = (name, location) => {
    const rating = (Math.random() * 1 + 4).toFixed(1);
    const reviews = Math.floor(Math.random() * 200) + 50;
    const headlineTemplate = headlines[Math.floor(Math.random() * headlines.length)];
    const headline = headlineTemplate
        .replace('{name}', name)
        .replace('{location}', location);
    
    return {
        rating: parseFloat(rating),
        reviews,
        headline
    };
};

// Routes
app.post('/business-data', (req, res) => {
    console.log('POST /business-data', req.body);
    const { name, location } = req.body;
    
    if (!name || !location) {
        return res.status(400).json({ error: 'Business name and location are required' });
    }
    
    const businessData = generateBusinessData(name, location);
    res.json(businessData);
});

app.get('/regenerate-headline', (req, res) => {
    console.log('GET /regenerate-headline', req.query);
    const { name, location } = req.query;
    
    if (!name || !location) {
        return res.status(400).json({ error: 'Business name and location are required' });
    }
    
    const headlineTemplate = headlines[Math.floor(Math.random() * headlines.length)];
    const headline = headlineTemplate
        .replace('{name}', name)
        .replace('{location}', location);
    
    res.json({ headline });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});