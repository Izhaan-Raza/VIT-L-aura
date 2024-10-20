## Register

POST /api/auth/register HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/json

{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
}

## Login

POST /api/auth/login HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/json

{
    "email": "testuser@example.com",
    "password": "password123"
}