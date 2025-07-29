# AI-Assisted Patient Visit Summaries

This project is a full-stack healthcare application designed for an engineering internship challenge. Its purpose is to enhance patient understanding of medical visits by leveraging Large Language Models (LLMs) to generate personalized, actionable recommendations based on visit summaries entered by physicians.

## Project Objectives

- Improve doctor–patient communication through AI-generated insights.
- Streamline medical visit documentation using a simple and intuitive web interface.
- Provide a practical demonstration of full-stack application development using modern technologies.

---

## Tech Stack

| Layer       | Technology       | Purpose                                |
|-------------|------------------|----------------------------------------|
| Backend     | Python (FastAPI) | RESTful API, LLM integration, DB logic |
| Frontend    | React            | UI for entering and viewing visits     |
| Database    | MongoDB          | Persistent storage of visit data       |
| AI Engine   | OpenAI GPT-4     | Personalized recommendations           |

---

##  Development Workflow

1. **Planning & Setup**  
   Define architecture, select LLM provider, configure GitHub and folder structure.

2. **Backend Development**  
   - Implement CRUD operations for patient visits  
   - Connect to MongoDB  
   - Integrate with selected LLM provider

3. **Frontend Development**  
   - Build a visit entry form (Screen 1)  
   - Display visit cards with “AI Insights” buttons (Screen 2)  
   - Handle asynchronous LLM responses

4. **Testing & Final Touches**  
   - Verify API endpoints  
   - Test full flow from input to AI response  
   - Improve responsiveness and error handling

5. **Documentation & Submission**  
   - Finalize `README.md` and usage instructions  
   - Record project decisions, challenges, and outcomes  
   - Push all changes with meaningful Git commits

---

##  Setup Instructions

Each subfolder (`/backend`, `/frontend`) contains its own README with installation steps, environment variables, and usage notes.

### Prerequisites

- Node.js and npm
- Python 3.10+
- Git
- MongoDB (local or Atlas)
- API key for selected LLM provider

> Setup instructions will be expanded as development progresses.
