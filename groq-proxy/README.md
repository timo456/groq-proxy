# GROQ Proxy Server

This is a simple proxy server for the GROQ API (LLAMA 3) using Express.

## Usage

POST /api/chat

Request body:
```json
{
  "model": "llama3-8b-8192",
  "messages": [
    { "role": "user", "content": "Say hello!" }
  ]
}
