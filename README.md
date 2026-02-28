# SecureVault - Encrypted Password Manager

A full-stack password manager with end-to-end encryption, built with the MERN stack.

## Features

- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **AES-256 Encryption**: All saved passwords encrypted before storage
- **CRUD Operations**: Create, read, update, and delete saved passwords
- **Protected Routes**: Middleware-based authentication for all password operations
- **Input Validation**: Server-side validation for all endpoints

## Tech Stack

**Backend:**
- Node.js & Express - RESTful API
- MongoDB & Mongoose - Database and ODM
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- crypto (Node.js built-in) - AES-256-GCM encryption

**Security:**
- Passwords hashed with bcrypt (cost factor: 10)
- Saved credentials encrypted with AES-256-GCM
- JWT tokens (24h expiration)
- Environment variables for secrets

## Project Structure
```
securevault/
├── server/
│   ├── models/
│   │   └── User.js          # User schema with password hashing
│   ├── routes/
│   │   ├── auth.js          # Signup & login endpoints
│   │   └── passwords.js     # Password CRUD endpoints
│   ├── middleware/
│   │   ├── auth.js          # JWT verification
│   │   └── validation.js    # Input validation
│   ├── utils/
│   │   └── encryption.js    # AES-256 encrypt/decrypt
│   ├── index.js             # Server entry point
│   └── .env                 # Environment variables (not committed)
└── README.md
```

## API Endpoints

### Authentication
```
POST /api/auth/signup    - Create new user account
POST /api/auth/login     - Login and receive JWT token
```

### Password Management (Protected Routes)
```
POST   /api/passwords      - Save a new password
GET    /api/passwords      - Retrieve all saved passwords (decrypted)
PUT    /api/passwords/:id  - Update a saved password
DELETE /api/passwords/:id  - Delete a saved password
```

## Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/securevault.git
cd securevault/server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_byte_hex_encryption_key
```

Generate keys:
```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. **Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Testing with cURL

**Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Save Password (use token from login):**
```bash
curl -X POST http://localhost:3000/api/passwords \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"website":"Facebook","username":"user@fb.com","password":"fbpass123"}'
```

## Security Features

### Password Hashing (bcrypt)
User account passwords are hashed with bcrypt before storage. The hash is one-way, meaning the original password cannot be recovered.

### Password Encryption (AES-256-GCM)
Saved passwords are encrypted using AES-256-GCM with:
- Unique IV (Initialization Vector) per encryption
- Authentication tag for integrity verification
- 256-bit encryption key

### JWT Authentication
- Tokens expire after 24 hours
- Contains user ID and email in payload
- Signed with secret key to prevent tampering

## What I Learned

- Building RESTful APIs with Express
- Authentication vs Authorization
- Difference between hashing and encryption
- JWT token-based authentication
- Mongoose middleware for automatic password hashing
- MongoDB document modeling
- Async/await error handling patterns
- Security best practices for web applications

## Future Enhancements

- [ ] React frontend
- [ ] Password strength indicator
- [ ] Password generator endpoint
- [ ] Categories/tags for passwords
- [ ] Search and filter functionality
- [ ] Two-factor authentication
- [ ] Password sharing (encrypted)

## Author

- GitHub: [@maxyurei](https://github.com/maxyurei)

## License

This project is open source and available under the MIT License.
