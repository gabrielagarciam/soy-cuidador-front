# Contact Form API Documentation

## Endpoint Details
- **URL**: `/api/contact`
- **Method**: `POST`
- **Content-Type**: `application/json`

## Request Payload

### Parameters
| Field     | Type   | Required | Constraints                     | Description                           |
|-----------|--------|----------|--------------------------------|---------------------------------------|
| name      | string | Yes      | 1-100 characters               | Full name of the sender               |
| email     | string | Yes      | Valid email format              | Email address of the sender           |
| message   | string | Yes      | 1-1000 characters               | Message content                       |
| honeypot  | string | Optional | Must be empty                  | Hidden field to prevent bot submissions |

### Example Request
```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com", 
  "message": "Hello, I'm interested in your service!",
  "honeypot": ""
}
```

## Response Formats

### Successful Response
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "message": "Message sent successfully"
}
```

### Error Responses

#### Validation Errors
- **Status Code**: `400 Bad Request`
- **Possible Error Messages**:
    - `Invalid name`
    - `Name must be between 1-100 characters`
    - `Invalid email`
    - `Invalid email format`
    - `Email domain not allowed`
    - `Invalid message`
    - `Message must be between 1-1000 characters`
    - `Bot submission detected`

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Body**:
```json
{
  "error": "Failed to send email"
}
```

## Additional Notes

### Security Considerations
- Input sanitization
- HTML escaping
- Honeypot bot protection
- Domain restrictions
