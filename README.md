# Chatters

A full-stack chat application with Nextjs frontend and Node.js backend.

## 🏗️ Project Structure

```
chat-app/
├── client/          # React/Next.js frontend
├── server/          # Node.js/Express backend
├── docker-compose.yml
├── package.json     # Root package.json for monorepo management
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Redis Server Running (Not required for Docker setup)
- Docker and Docker Compose (for Docker setup)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chat-app
   ```

2. **Or install manually**
   ```bash
   npm run install:all
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

### Environment Variables

Create `.env` files in both client and server directories:

**server/.env**
```env
PORT=8080
JWT_KEY=your-jwt-secret
DATABASE_URL=mongodb://localhost:27017/chat-app
REDIS_HOST=localhost
REDIS_PORT=6379
```

**client/.env.local**
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
```

## 🐳 Docker Setup

The application includes Docker configuration for easy deployment:

```bash
# Start all services (MongoDB, Redis, Server, Client)
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# MongoDB: localhost:27017
# Redis: localhost:6379
```

## 🔧 Development Workflow

1. **Start development servers**
   ```bash
   npm run dev
   ```

2. **Make changes** to client or server code

3. **Test changes** - both servers will auto-reload

4. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Notes

- The client runs on http://localhost:3000
- The server runs on http://localhost:8080
- MongoDB runs on localhost:27017
- Redis runs on localhost:6379
- All services are configured to work together automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run dev`
5. Submit a pull request
