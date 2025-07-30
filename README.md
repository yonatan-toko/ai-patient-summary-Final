# AI-Assisted Patient Visit Summaries

This project is a full-stack healthcare application designed for an engineering internship challenge. Its purpose is to enhance patient understanding of medical visits by leveraging Large Language Models (LLMs) to generate personalized, actionable recommendations based on visit summaries entered by physicians.

## Project Objectives

- Improve doctor–patient communication through AI-generated insights.
- Streamline medical visit documentation using a simple and intuitive web interface.
- Provide a practical demonstration of full-stack application development using modern technologies.

---

## Tech Stack

| Layer       | Technology                                           | Purpose                                |
|-------------|------------------------------------------------------|----------------------------------------|
| Backend     | Python   (FastAPI)                                   | RESTful API, LLM integration, DB logic |
| Frontend    | React    (Vite)                                      | UI for entering and viewing visits     |
| Database    | MongoDB  (Atlas)                                     | Persistent storage of visit data       |
| AI Engine   | `mistralai/mixtral-8x7b-instruct` via OpenRouter     | Personalized recommendations           |
| Styling     | Inline CSS / CSS-in-JS                               |                                        |
| Versioning  | Git + GitHub                                         |                                        |

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
- MongoDB (Atlas)
- API key for selected LLM provider

---

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-patient-summary.git
cd ai-patient-summary

### 2. Start the Backend

cd backend
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Create a .env file (or use environment variables) with:
MONGODB_URL=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key

### 3. Start the Frontend:

cd ../frontend
npm install
npm run dev

Then open: http://localhost:5173

---

# Project Structure

ai-patient-summary/
├── backend/
│   ├── main.py
│   ├── llm.py
│   └── ...
├── frontend/
│   ├── VisitForm.jsx
│   ├── VisitList.jsx
│   └── ...
└── README.md

---

> Thank you for reviewing this project, and for this amazing and fun opportunity :)
> Feel free to explore the code, test the app, or reach out with any questions:
> Yonatan Hadad - Email: yonatan.hadad24@gmail.com