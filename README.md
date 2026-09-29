# 🛡️ ProjectShield

### Infrastructure Project Monitoring, Analytics & Risk Management Platform

ProjectShield is a web-based platform designed to help organizations **monitor infrastructure projects, analyze project performance, identify delays and cost deviations, and detect projects requiring attention** from a single interactive dashboard.

The platform converts project data into actionable insights through interactive analytics, centralized monitoring, filtering, project-level analysis, and an explainable risk assessment system.

---

## 🚀 What is ProjectShield?

Managing large infrastructure projects involves monitoring multiple factors simultaneously:

* Project cost
* Revised cost
* Expenditure
* Physical progress
* Completion schedules
* Project delays
* Project status
* Risk indicators
* Sector and regional distribution

ProjectShield brings these factors together in one platform.

Instead of manually analyzing large project tables, users can use the dashboard to quickly understand:

> **What projects are being monitored?**

> **How much has been spent?**

> **Which projects have cost or schedule deviations?**

> **Where are projects progressing slowly?**

> **Which projects require closer monitoring?**

---

# ✨ Key Features

## 📊 Interactive Dashboard

The main dashboard provides a real-time overview of project performance.

### Key Performance Indicators

* Total Projects
* Original Project Cost
* Revised Project Cost
* Total Expenditure
* Average Physical Progress
* Completed Projects
* Delayed Projects
* High-Risk Projects

All values are generated from the application's backend data.

---

## 📈 Advanced Analytics

ProjectShield provides multiple views for understanding project performance.

### Sector Analytics

Analyze projects across different sectors using:

* Project count
* Cost
* Revised cost
* Expenditure
* Physical progress
* Delayed projects

### State / Region Analytics

Understand project distribution and performance by geographical region.

### Ministry / Department Analytics

Compare project portfolios across different administrative organizations.

### Cost Analytics

Analyze:

* Original approved cost
* Revised cost
* Expenditure
* Cost deviation
* Cost-overrun percentage

### Progress Analytics

Projects can be analyzed using physical-progress ranges such as:

```text
0–20%
21–40%
41–60%
61–80%
81–99%
100%
```

### Status Analytics

Projects are categorized based on their current monitoring conditions, such as:

```text
Completed
On Track
Delayed
Cost Overrun
Critical
Not Started
```

---

# ⚠️ Explainable Risk Assessment

ProjectShield includes an explainable rule-based risk engine.

Instead of producing an unexplained risk number, the system identifies the factors contributing to the risk.

Example:

```text
Risk Score: 78
Risk Level: HIGH

Reasons:
• Project has schedule deviation
• Revised cost is higher than the original cost
• Physical progress is relatively low
```

The risk engine can consider:

* Cost deviation
* Schedule deviation
* Physical progress
* Expenditure
* Progress vs expenditure relationship
* Overdue project status

The risk score is **system-derived and explainable**.

---

# 🔎 Smart Filtering & Search

Users can filter projects using multiple criteria.

### Available filters

```text
Sector
Ministry / Department
State / Region
Project Status
Risk Level
Reporting Period
```

Multiple filters can be combined.

Example:

```text
State = Maharashtra
+
Sector = Transport
+
Risk = High
```

The backend processes the filters and returns the relevant results.

---

# 📋 Project Monitoring

The project table provides a centralized view of monitored projects.

Users can search and inspect:

* Project Code
* Project Name
* Sector
* Ministry
* State
* Implementing Agency
* Original Cost
* Revised Cost
* Expenditure
* Physical Progress
* Completion Dates
* Project Status
* Risk Level

The system uses **server-side pagination** so large datasets do not need to be loaded into the browser at once.

---

# 🔍 Project Details

Each project can be inspected individually.

The project detail view can provide:

```text
Project Information
       ↓
Cost Information
       ↓
Expenditure
       ↓
Physical Progress
       ↓
Completion Schedule
       ↓
Status
       ↓
Risk Score
       ↓
Risk Explanation
```

Where historical observations are available, project performance can also be examined across reporting periods.

---

# 📅 Historical Monitoring

ProjectShield is designed to preserve project observations across reporting periods.

Instead of overwriting previous observations, the system can maintain historical snapshots:

```text
Project
│
├── January
├── February
├── March
├── April
└── May
```

This enables analysis of:

* Progress trends
* Expenditure trends
* Cost revisions
* Schedule changes
* Project performance over time

Historical charts only use available observations and do not generate artificial history.

---

# 🗺️ Geographic Analysis

The platform architecture supports geographical project visualization.

Where authoritative geographical coordinates are available, projects can be represented on a map to provide a spatial view of project distribution.

The system does not generate artificial coordinates for projects where reliable location information is unavailable.

---

# 🏗️ System Architecture

```text
                    PROJECT DATA
                         │
                         ▼
                 Data Ingestion
                         │
                         ▼
              Cleaning & Normalization
                         │
                         ▼
                   Data Validation
                         │
                         ▼
                    MongoDB
                         │
            ┌────────────┼────────────┐
            │            │            │
            ▼            ▼            ▼
        Projects     Historical     Analytics
                      Snapshots       Engine
            │            │            │
            └────────────┼────────────┘
                         ▼
                  Express REST API
                         │
                         ▼
                  React Frontend
                         │
                         ▼
              Interactive Dashboard
```

---

# 🧠 Analytics Flow

```text
User selects filters
        ↓
Frontend sends API request
        ↓
Express backend
        ↓
Filter & analytics service
        ↓
MongoDB aggregation
        ↓
Processed JSON response
        ↓
Frontend state update
        ↓
Charts / KPIs / Tables update
```

This approach avoids downloading the complete dataset into the browser and filtering everything locally.

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Vite
* HTML5
* CSS
* Charting libraries

## Backend

* Node.js
* Express.js
* REST API
* JWT authentication
* Request validation
* File ingestion services

## Database

* MongoDB
* Mongoose
* MongoDB Atlas

## Data Processing

* CSV
* XLSX
* JSON
* Data normalization
* Validation
* MongoDB aggregation pipelines

## Development Tools

* Git
* GitHub
* Nodemon
* VS Code / compatible IDE

---

# 📁 Project Structure

```text
projectshield-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── analytics/
│   │   ├── ingestion/
│   │   └── utils/
│   │
│   ├── data/
│   ├── import.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🔌 API Overview

## Health

```http
GET /api/health
GET /api/health/db
```

## Projects

```http
GET /api/projects
GET /api/projects/:id
```

## Analytics

```http
GET /api/analytics/summary
GET /api/analytics/sectors
GET /api/analytics/states
GET /api/analytics/ministries
GET /api/analytics/cost
GET /api/analytics/progress
GET /api/analytics/status
GET /api/analytics/risk
GET /api/analytics/high-risk
GET /api/analytics/delays
GET /api/analytics/monthly
GET /api/analytics/coverage
```

Example:

```http
GET /api/analytics/summary?state=Maharashtra
```

---

# 🔄 Data Processing Pipeline

ProjectShield uses a structured data pipeline:

```text
Source File
    ↓
Import
    ↓
Column Mapping
    ↓
Data Cleaning
    ↓
Normalization
    ↓
Validation
    ↓
Deduplication
    ↓
Derived Metrics
    ↓
MongoDB
    ↓
Analytics API
    ↓
Dashboard
```

The system separates:

### Source Data

Information directly contained in the imported records.

### Derived Data

Information calculated by the application, such as:

* Cost-overrun percentage
* Schedule deviation
* Project status
* Risk score
* Risk level
* Risk reasons

---

# ▶️ Running the Project

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/projectshield-ai.git
cd projectshield-ai
```

---

## 2. Install backend dependencies

```bash
cd backend
npm install
```

---

## 3. Configure environment variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret
```

Never commit the real `.env` file.

---

## 4. Start the backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 6. Start the frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Testing

Backend health:

```http
GET http://localhost:5000/api/health
```

Database health:

```http
GET http://localhost:5000/api/health/db
```

Project data:

```http
GET http://localhost:5000/api/projects
```

Analytics:

```http
GET http://localhost:5000/api/analytics/summary
```

---

# 🔐 Security

ProjectShield uses:

* Environment variables for secrets
* Password hashing
* JWT authentication
* Helmet
* CORS configuration
* Request validation
* Rate limiting
* Centralized error handling
* Database access controls

Sensitive credentials are not intended to be exposed to the frontend.

---

# 🎯 Project Goals

ProjectShield aims to make project monitoring:

### Centralized

Project information is available through a single interface.

### Data-driven

Charts and KPIs are generated from backend data rather than static values.

### Interactive

Users can filter, search and analyze project information dynamically.

### Explainable

Risk indicators provide reasons rather than only displaying a numerical score.

### Scalable

The backend and database architecture can support larger datasets and additional reporting periods.

### Transparent

The system distinguishes source information from system-derived analytics.

---

# 🌟 Why ProjectShield?

Traditional project monitoring can involve reviewing large tables, reports and multiple performance indicators separately.

ProjectShield brings these elements together:

```text
Projects
   +
Costs
   +
Expenditure
   +
Progress
   +
Schedules
   +
Risk
   ↓
Unified Monitoring Platform
```

This helps users move from:

**"What is happening?"**

to:

**"Which projects need attention and why?"**

---

# 🚀 Future Enhancements

Potential future improvements include:

* Automated data refresh
* Expanded historical monitoring
* GIS-based project visualization
* Milestone-level tracking
* Notification and alert systems
* Advanced predictive analytics
* Role-based monitoring workflows
* Cloud deployment
* Mobile-responsive monitoring interface
* More advanced project-performance comparisons

---

# 📌 Project Status

**ProjectShield is under active development.**

Current capabilities include:

* Interactive project dashboard
* Backend REST APIs
* MongoDB integration
* Project analytics
* Cost and progress analysis
* Filtering and search
* Server-side pagination
* Historical snapshot architecture
* Explainable risk assessment
* Data ingestion pipeline

---

# 👨‍💻 Project

**ProjectShield**

Infrastructure Project Monitoring, Analytics & Risk Management Platform

Developed as an academic / hackathon project.

---

# 📜 Disclaimer

ProjectShield is an independent software project created for academic and hackathon purposes.

The platform is designed as a project-monitoring and analytics solution and should be evaluated according to the data sources and configuration used in a particular deployment.
