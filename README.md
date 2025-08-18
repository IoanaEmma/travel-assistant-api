# Travel Assistant API

A Node.js/TypeScript backend API for a travel planning application that helps users search for flights, hotels, and attractions, and organize them into trips.

## Features

- **AI-Powered Chat**: Natural language processing for travel queries using Meta-Llama model with conversation context
- **Flight Search**: Search and book flights with detailed itineraries
- **Hotel Search**: Find hotels with rates and booking options
- **Attraction Discovery**: Explore local attractions and points of interest
- **Trip Management**: Create, manage, and organize travel itineraries
- **Database Storage**: Persistent storage for user trips and preferences
- **Conversation History**: Contextual chat responses with conversation memory

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **AI Integration**: Llama3.1:8b-instruct-q4_K_M
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

   # EXTERNAL APIS
   TOGETHER_API=https://api.together.xyz/v1/chat/completions
   HOTELS_API=https://hotels-api-url
   FLIGHT_API=https://flights-api-url
   ATTRACTIONS_API=https://attractions-api-url

   # API Keys
   TOGETHER_API_KEY=your_together_ai_api_key
   HOTELS_API_KEY=your_hotels_api_key
   FLIGHT_API_KEY=your_flights_api_key
   ATTRACTIONS_API_KEY=your_attractions_api_key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## Project Structure
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

## API Endpoints

### Chat
- `POST /chat` - Send natural language queries to the AI assistant with conversation context

### Flights
- `POST /flight` - Save a flight to the database
- `GET /flight` - Get all flights or filter by city (query param: `city`)
- `DELETE /flight/:id` - Delete a flight

### Hotels
- `POST /hotel` - Save a hotel to the database
- `GET /hotel` - Get hotel details and rates (query params: `key`, `checkInDate`, `checkOutDate`)
- `GET /hotel/search` - Get all hotels or filter by city (query param: `city`)
- `GET /hotel/cities` - Get all cities where hotels are available
- `DELETE /hotel/:id` - Delete a hotel

### Attractions
- `POST /attraction` - Save an attraction to the database
- `GET /attraction` - Get all attractions or filter by city (query param: `city`)
- `GET /attraction/cities` - Get all cities where attractions are available
- `DELETE /attraction/:id` - Delete an attraction

### Trips
- `POST /trip` - Create a new trip
- `GET /trip/user/:userId` - Get all trips for a user
- `GET /trip/:userId/:tripId` - Get detailed trip information
- `PUT /trip/add-item/:tripId` - Add hotel/flight/attraction to a trip
- `DELETE /trip/remove-item/:tripId` - Remove hotel/flight/attraction from a trip
- `PUT /trip/:tripId/status` - Update trip status (active/completed/canceled)
- `DELETE /trip/:id` - Delete a trip

## Request Examples

### Chat with AI (with conversation context)
```bash
POST /chat
Content-Type: application/json

{
  "userMessage": "Find me flights from Bucharest to Rome from May 22 to May 26 for 2 adults",
  "conversationHistory": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}

Response:
{
  "response": { "flights": [...] } | "text response",
  "tab": "flights" | "hotels" | "attractions" | "home",
  "conversationHistory": [...]
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

### Key Entity Properties

#### Trip
- `id`: Primary key
- `userId`: String (GID) - User identifier
- `name`: Trip name
- `when`: Trip dates
- `status`: "active" | "completed" | "canceled"

#### Hotel
- Includes `rates` relation with min/max price calculation
- Supports past date adjustment for check-in/check-out

#### Flight
- `departureFlight`: FlightDetails for outbound journey
- `returnFlight`: FlightDetails for return journey
- Default values: `passengers = 1`, `cabinClass = "Economy"`

## AI Integration

The API uses Together AI's Meta-Llama-3.1-70B-Instruct-Turbo model to:

1. **Classify User Intent**: Determine if a query requires function calling
2. **Extract Parameters**: Parse natural language for search parameters
3. **Provide Responses**: Give contextual travel advice and information
4. **Maintain Context**: Remember conversation history for follow-up questions

### Supported Functions

- `searchFlights`: Extract flight search parameters from natural language
- `searchHotels`: Parse hotel search requirements
- `searchAttractions`: Identify attraction search criteria

### Conversation Features

- **Stateless Design**: Conversation history sent from client
- **Context Awareness**: AI remembers previous messages
- **Follow-up Support**: "What about hotels there?" after flight search
- **Function Integration**: Seamless switching between tool calls and natural responses