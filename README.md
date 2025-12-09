# Flipr Full-Stack (Django + React)

A modern, responsive full-stack Flipr-style project built with Django REST Framework (DRF) backend and React (Vite) frontend.

## Features
- ✅ Project Portfolio listing with image cropping
- ✅ Client testimonials carousel
- ✅ Contact form (public submissions)
- ✅ Newsletter subscription
- ✅ Responsive mobile-first UI with Tailwind CSS
- ✅ Django admin for managing projects, clients, contacts, subscribers
- ✅ RESTful API with DRF
- ✅ Image processing with Pillow (center-crop to 450x350, 1200x600)
- ✅ SQLite for dev, PostgreSQL ready for production
- ✅ Docker & Docker Compose templates included

---

## Quick Start (Development)

### Backend Setup

1. **Create & activate virtual environment:**
```powershell
python -m venv .venv
. .venv\Scripts\Activate.ps1
```

2. **Install dependencies:**
```powershell
pip install -r requirements.txt
```

3. **Set up environment:**
```powershell
cp .env.example .env
# Edit .env if needed (Django secret, DEBUG=True for dev, etc.)
```

4. **Run migrations:**
```powershell
python manage.py migrate
```

5. **Create superuser (admin):**
```powershell
python manage.py createsuperuser
# Follow prompts for username, email, password
```

6. **Start dev server:**
```powershell
python manage.py runserver
```
Server runs at: **http://localhost:8000**

### Frontend Setup

1. **Navigate to frontend:**
```powershell
cd frontend
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Start dev server:**
```powershell
npm run dev
```
Frontend runs at: **http://localhost:3000**

### Frontend smoke tests

I added a simple Node smoke-test that checks the dev frontend and API without a browser download. Run this from the `frontend` folder while `npm run dev` and Django are running:

```powershell
cd frontend
node smoke_check.js
```

If you want full end-to-end UI tests, Playwright is configured under `frontend/playwright.config.js` and a basic test exists at `frontend/tests/home.spec.js`. Playwright requires browser binaries — install and run locally with:

```powershell
cd frontend
npm install
npx playwright install
npm run dev   # in one terminal (runs at http://localhost:3001)
npx playwright test
```

If the Playwright browser download fails in your environment, you can skip it and use `smoke_check.js` as a lightweight alternative.

---

## API Endpoints

### Public (GET/POST)
- `GET /api/projects/` — List all projects
- `GET /api/clients/` — List all clients
- `POST /api/contacts/` — Submit contact form (name, email, mobile, message)
- `POST /api/subscribers/` — Subscribe to newsletter (email)

### Admin Only (Protected)
- `POST /api/projects/` — Create project (requires admin)
- `PUT/PATCH /api/projects/{id}/` — Update project (requires admin)
- `DELETE /api/projects/{id}/` — Delete project (requires admin)
- `POST /api/clients/` — Create client (requires admin)
- `GET /api/contacts/` — List contact submissions (admin only)
- `GET /api/subscribers/` — List subscribers (admin only)

---

## Admin Panel

### Django Admin
Visit **http://localhost:8000/admin/** and log in with your superuser credentials.

Features:
- Manage Projects (with image upload & auto-crop)
- Manage Clients & testimonials
- View Contact submissions
- View Newsletter subscribers

---

## File Structure

```
Flipr/
├── flipr_backend/          # Django project
│   ├── settings.py         # Django config
│   ├── urls.py             # Main URL routes
│   ├── wsgi.py             # WSGI app
│   └── asgi.py             # ASGI app
├── core/                   # Django app
│   ├── models.py           # Project, Client, ContactSubmission, Subscriber
│   ├── serializers.py      # DRF serializers with validation
│   ├── views.py            # API viewsets
│   ├── urls.py             # App routes
│   ├── admin.py            # Admin registrations
│   └── tests/              # Unit tests
├── frontend/               # React (Vite)
│   ├── src/
│   │   ├── App.jsx         # Main app with routes
│   │   ├── main.jsx        # Entry point
│   │   ├── index.css       # Tailwind directives
│   │   ├── pages/          # Home, AdminStub
│   │   ├── components/     # Header, Hero, Projects, Clients, Contact, Newsletter, Footer
│   │   └── services/       # api.js (axios wrapper)
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite config
│   ├── tailwind.config.js  # Tailwind CSS config
│   └── index.html          # HTML entry
├── .env.example            # Environment variables template
├── requirements.txt        # Python dependencies
├── manage.py               # Django CLI
├── Procfile                # Heroku/Render deployment
├── Dockerfile              # Docker config
├── docker-compose.yml      # Multi-container setup
└── README.md               # This file
```

---

## Testing

### Run Django Tests
```powershell
python manage.py test
```

### Sample API Calls (using curl or Postman)

**Get all projects:**
```bash
curl http://localhost:8000/api/projects/
```

**Create a project (admin auth required):**
```bash
curl -X POST http://localhost:8000/api/projects/ \
  -H "Content-Type: application/json" \
  -u admin:password \
  -d '{"title":"My Project","slug":"my-project","description":"A cool project"}'
```

**Subscribe to newsletter:**
```bash
curl -X POST http://localhost:8000/api/subscribers/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe"}'
```

**Submit contact form:**
```bash
curl -X POST http://localhost:8000/api/contacts/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","mobile":"+911234567890","message":"Hello!"}'
```

---

## Deployment

### Heroku / Render

1. **Set environment variables on platform:**
   - `DJANGO_SECRET_KEY` — Generate a secure key
   - `DEBUG=False`
   - `ALLOWED_HOSTS=yourdomain.com`
   - `CORS_ALLOWED_ORIGINS=https://yourdomain.com`
   - `DATABASE_URL` — Postgres connection (Heroku Postgres addon)

2. **Push to platform:**
```bash
git push heroku main
```

3. **Run migrations on deployed app:**
```bash
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### Docker

```powershell
docker-compose up -d
# Access at http://localhost:8000
```

### Docker frontend preview (nginx)

The repository includes a frontend Dockerfile and `nginx` config. To build and preview the production frontend together with the backend via Docker Compose:

```powershell
# From repo root
docker-compose build frontend
docker-compose up -d web db frontend
# Frontend production preview available at http://localhost:3002
```

Notes:
- `frontend` service serves the built static files via nginx and proxies `/api/` to the `web` service.
- If you only want to preview frontend without backend API, you can run the `frontend` image alone, but API calls will fail unless `web` is available.

---

## Production Notes

- **Media Handling:**  
  For production, use AWS S3 or Cloudinary for media. Update `DEFAULT_FILE_STORAGE` in settings.
  
- **Database:**  
  Switch from SQLite to PostgreSQL (set `DATABASE_URL` in .env).

- **CORS & CSRF:**  
  - CORS configured for `CORS_ALLOWED_ORIGINS`
  - CSRF token handled via Django session auth or DRF token auth

- **Static Files:**  
  WhiteNoise serves static files in production; run `python manage.py collectstatic` before deploying.

---

## Git Workflow (Suggested)

```bash
git init
git checkout -b main

# Feature branches
git checkout -b feature/api
# ... commit changes ...
git checkout main
git merge feature/api

git checkout -b feature/frontend
# ... commit changes ...
git checkout main
git merge feature/frontend

# Deploy branch
git checkout -b chore/deploy
git checkout main
git merge chore/deploy
```

---

## Troubleshooting

**Frontend not connecting to backend?**
- Check `VITE_API_BASE_URL` in frontend `.env` (or defaults to `http://localhost:8000/api`)
- Ensure CORS is enabled in Django settings
- Check browser console for CORS errors

**Django migrations failing?**
- Delete `db.sqlite3` and re-run `python manage.py migrate`
- Ensure all models are registered in `core/models.py`

**Images not uploading?**
- Check `MEDIA_ROOT` in settings (defaults to `./media/`)
- Ensure folder exists and has write permissions
- Verify Pillow is installed: `pip install Pillow`

---

## Support & Next Steps

- Extend frontend components as needed
- Add more models/endpoints to `core/`
- Set up CI/CD with GitHub Actions
- Configure email backend for notifications
- Add authentication tokens (DRF Token Auth or JWT)

Happy coding! 🚀
