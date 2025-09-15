# Notes Vault API

A RESTful API for managing personal notes built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- CRUD operations for notes
- Notes with title, content, and tags
- MongoDB database integration
- JWT-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript

## API Endpoints

### Authentication Routes
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Notes Routes
All notes routes require authentication

- `GET /notes` - Get all notes for authenticated user
- `POST /notes` - Create a new note
- `PATCH /notes/:id` - Update an existing note
- `DELETE /notes/:id` - Delete a note

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── validators/    # Input validation
├── @types/           # TypeScript type definitions
├── package.json
└── tsconfig.json
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add required environment variables (MongoDB URL, JWT secret, etc.)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Models

### User Model
```typescript
{
  username: string (required),
  password: string (required),
  email: string (required)
}
```

### Notes Model
```typescript
{
  title: string,
  content: string,
  tags: string[],
  createdAt: Date,
  userId: ObjectId (reference to User)
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
