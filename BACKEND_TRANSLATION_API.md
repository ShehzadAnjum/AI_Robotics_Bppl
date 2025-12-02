# Backend Translation API Endpoint

## Instructions

Add this file to your Vercel backend project at: `~/dev/robotics-book-chat-api/api/translate.js`

This creates a new API endpoint at: `https://airobobookmagic.vercel.app/api/translate`

---

## File: `api/translate.js`

```javascript
/**
 * Translation API Endpoint
 * Translates text to Urdu using Google Gemini AI
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://shehzadanjum.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, targetLanguage } = req.body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > 1000) {
      return res.status(400).json({ error: 'Text too long (max 1000 characters)' });
    }

    // Get Gemini model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.3, // Lower temperature for more accurate translations
        maxOutputTokens: 500,
      }
    });

    // Create translation prompt
    const prompt = `Translate the following English text to Urdu.
Provide ONLY the Urdu translation, without any explanations or additional text.
Use proper Urdu script and grammar.

Text to translate: "${text}"

Urdu translation:`;

    // Generate translation
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text().trim();

    // Return translation
    return res.status(200).json({
      success: true,
      translation: translation,
      originalText: text,
      targetLanguage: targetLanguage || 'urdu'
    });

  } catch (error) {
    console.error('Translation error:', error);

    // Handle specific Gemini errors
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        error: 'Translation service configuration error. Please check API key.'
      });
    }

    return res.status(500).json({
      error: 'Translation failed. Please try again later.'
    });
  }
}
```

---

## Deployment Steps

1. **Navigate to your backend project:**
   ```bash
   cd ~/dev/robotics-book-chat-api
   ```

2. **Create the translate endpoint:**
   ```bash
   mkdir -p api
   # Copy the code above into: api/translate.js
   ```

3. **Verify your environment variables are set:**
   - Go to: https://vercel.com/shehzadanjums-projects/ai_robobook_magic/settings/environment-variables
   - Ensure `GEMINI_API_KEY` is set

4. **Deploy to Vercel:**
   ```bash
   git add api/translate.js
   git commit -m "feat: add Urdu translation API endpoint"
   git push
   ```

   Or manually redeploy in Vercel dashboard.

---

## Testing the API

### Using curl:
```bash
curl -X POST https://airobobookmagic.vercel.app/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "targetLanguage": "urdu"}'
```

### Expected Response:
```json
{
  "success": true,
  "translation": "ہیلو ورلڈ",
  "originalText": "Hello World",
  "targetLanguage": "urdu"
}
```

---

## API Specifications

### Endpoint
```
POST https://airobobookmagic.vercel.app/api/translate
```

### Request Body
```json
{
  "text": "Text to translate",
  "targetLanguage": "urdu"
}
```

### Response (Success)
```json
{
  "success": true,
  "translation": "Translated text in Urdu",
  "originalText": "Original text",
  "targetLanguage": "urdu"
}
```

### Response (Error)
```json
{
  "error": "Error message"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad request (invalid input)
- `405` - Method not allowed (not POST)
- `500` - Server error

---

## Features

✅ **Fast Translation**: Uses Gemini 2.0 Flash (optimized for speed)
✅ **CORS Enabled**: Works with GitHub Pages frontend
✅ **Input Validation**: Max 1000 characters
✅ **Error Handling**: Clear error messages
✅ **Low Temperature**: Accurate translations (temp: 0.3)
✅ **Clean Output**: Only returns translation, no explanations

---

## Security Notes

- API key stored in environment variables (not in code)
- CORS restricted to your GitHub Pages domain
- Input validation prevents abuse
- Character limit prevents excessive API usage

---

## Troubleshooting

### Issue: "API key reported as leaked"
**Solution**: Generate new Gemini API key at https://aistudio.google.com/apikey and update in Vercel

### Issue: "CORS error"
**Solution**: Verify origin is set to `https://shehzadanjum.github.io` in CORS headers

### Issue: "Translation not working"
**Solution**: Check Vercel deployment logs for errors

---

Once deployed, the frontend chat widget will automatically use this endpoint when users click "Translate to Urdu"!
