# SurfSync Infotech AI Business Chatbot

## Project Overview

The SurfSync Infotech AI Business Chatbot is a web-based business assistant that answers common company-related questions using a locally configured knowledge base and collects project enquiries through a web form.

## Features

- **Business Q&A:** Provides information about services, industries, technologies, pricing guidance, project timelines, and contact details.
- **Keyword-Based Matching:** Matches user questions against configured keywords.
- **Interactive Chat Interface:** Supports suggested questions and manually entered messages.
- **Lead Capture:** Collects project requirements and saves enquiries to a SQLite database.
- **Form Validation:** Includes required-field checks and consent handling.
- **REST API:** Uses FastAPI endpoints for chatbot responses and enquiry submission.
- **Local Operation:** Supports local execution without requiring an external AI API.

## Technology Stack

- Python
- FastAPI
- HTML
- CSS
- JavaScript
- SQLite

## Project Structure

```text
surfsync_ai_business_chatbot/
├── app/
│   ├── main.py
│   └── static/
│       ├── index.html
│       ├── styles.css
│       └── app.js
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## Setup Instructions

1. Install Python.
2. Open the project directory in a terminal.
3. Create and activate a virtual environment.
4. Install dependencies:

   `pip install -r requirements.txt`

5. Start the application:

   `uvicorn app.main:app --reload`

6. Open `http://127.0.0.1:8000` in your browser.

## API Endpoints

- `/api/health` — application health check.
- `/api/chat` — processes chatbot messages.
- `/api/leads` — accepts project enquiries.
- `/docs` — interactive API documentation.

## Testing

The project was manually tested for chatbot responses, suggested-question buttons, enquiry submission, API health, API documentation, and form validation.

## Limitations

The chatbot uses predefined information and keyword matching. It does not provide unrestricted AI-generated answers. Company details and any unverified services, pricing, or policies should be confirmed with SurfSync Infotech.

## Privacy

Use test data during development. Do not commit API keys, database files containing real customer information, or other sensitive data to version control.

