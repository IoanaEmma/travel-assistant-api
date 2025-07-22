# Travel Assistant API

A Node.js/TypeScript backend API for a travel planning application that helps users search for flights, hotels, and attractions, and organize them into trips.

## Features

- **AI-Powered Chat**: Natural language processing for travel queries using Meta-Llama model
- **Flight Search**: Search and book flights with detailed itineraries
- **Hotel Search**: Find hotels with rates and booking options
- **Attraction Discovery**: Explore local attractions and points of interest
- **Trip Management**: Create, manage, and organize travel itineraries
- **Database Storage**: Persistent storage for user trips and preferences

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **AI Integration**: Together AI (Meta-Llama-3.1-70B-Instruct-Turbo)
- **External APIs**: Flight/Hotel/Attraction booking services

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-assistant-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=travel_assistant

   # API Keys
   TOGETHER_API_KEY=your_together_ai_api_key
   HOTELS_API=https://hotels-api-url
   FLIGHTS_API=https://flights-api-url
   ATTRACTIONS_API=https://attractions-api-url
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Chat
- `POST /chat` - Send natural language queries to the AI assistant.

### Flights
- `POST /flight` - Save a flight to the database

### Hotels
- `POST /hotel` - Save a hotel to the database

### Attractions
- `POST /attraction` - Save an attraction to the database

### Trips
- `POST /trip` - Create a new trip
- `GET /trip/:userId` - Get all trips for a user
- `GET /trip/:userId/:tripId` - Get detailed trip information
- `PUT /trip/add-item/:tripId` - Add hotel/flight/attraction to a trip
- `PUT /trip/:tripId/status` - Update trip status (active/completed/canceled)

## Request Examples

### Chat with AI
```bash
POST /chat
Content-Type: application/json

Description: This endpoint can return flights, hotels, attractions or normal model response 

{
  "userMessage": "Find me flights from Bucharest to Rome from May 22 to May 26 for 2 adults"
}
```

### Create Trip
```bash
POST /trip
Content-Type: application/json

{
  "userId": "user123",
  "name": "Rome Vacation",
  "when": "May 2025",
  "status?": "active"
}
```

### Add Item to Trip
```bash
PUT /trip/add-item/1
Content-Type: application/json

{
  "type": "hotel",
  "itemId": 123
}
```



## Database Schema

### Core Entities

- **Trip**: Main trip entity with user association
- **Hotel**: Hotel information with rates
- **Flight**: Flight information with departure/return details
- **Attraction**: Tourist attractions and points of interest
- **FlightDetails**: Detailed flight information (departure/return)
- **FlightSegment**: Individual flight segments
- **HotelRate**: Hotel pricing information

### Entity Relationships

- `Trip` → `Hotel` (ManyToOne)
- `Trip` → `Flight` (ManyToOne)  
- `Trip` → `Attraction` (ManyToMany)
- `Flight` → `FlightDetails` (OneToOne for departure/return)
- `FlightDetails` → `FlightSegment` (OneToMany)
- `Hotel` → `HotelRate` (OneToMany)

## AI Integration

The API uses Together AI's Meta-Llama-3.1-70B-Instruct-Turbo model to:

1. **Classify User Intent**: Determine if a query requires function calling
2. **Extract Parameters**: Parse natural language for search parameters
3. **Provide Responses**: Give contextual travel advice and information

### Supported Functions

- `search_flights`: Extract flight search parameters from natural language
- `search_hotels`: Parse hotel search requirements
- `search_attractions`: Identify attraction search criteria

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request for invalid input
- **Not Found**: 404 for missing resources
- **Server Errors**: 500 for internal server errors
- **Rate Limiting**: 429 for API rate limit exceeded

## Development

### Scripts
```bash
npm run dev     # Start development server
npm run build   # Build TypeScript
npm start       # Start production server
```

### Project Structure
```
src/
├── ai/           # AI model integration
├── controllers/  # Request handlers
├── entities/     # TypeORM entities
├── routes/       # Express routes
├── services/     # Business logic
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── dataSource.ts # Database configuration
```

## Environment

- **Node.js**: 18+ 
- **TypeScript**: 5+
- **Database**: PostgreSQL 13+