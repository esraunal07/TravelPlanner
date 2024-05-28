# Travel Planner API Documentation

Welcome to the documentation for the Travel Planner API. This API provides information about various travel destinations, including attractions, accommodation options, transport, weather, and local cuisine.

## Overview

The Travel Planner API is designed to help users plan their travel itineraries by providing detailed information about destinations worldwide. Whether you're looking for tourist attractions, booking accommodation, finding transportation options, checking the weather, or exploring local cuisine, this API has you covered.

## Authentication

The Travel Planner API does not require authentication for accessing public information. However, certain endpoints may require authentication for advanced features such as booking accommodations or accessing personalized recommendations.

## Endpoint Structure

The base URL for the Travel Planner API is  `http://localhost:3000/api/`.
`.

- `api/attractions`: Retrieve information about tourist attractions.
- `api/accommodations`: Get details about accommodation options.
- `api/transports`: Access transportation options available in a destination.
- `api/weathers`: Get current weather information for a specific location.
- `api/cuisines`: Explore local cuisine options.

## Request Parameters

### `api/attractions`

- `name`: The name of the attraction.
- `city`: The name of the city where the attraction is located.
- `location`: The specific location or coordinates of the attraction.
- `description`: A brief description of the attraction.

### `api/accommodation`

- `city`: The name of the city for which accommodation options are requested.
- `name`: The name of the accommodation.
- `address`: The address of the accommodation.
- `description`: A brief description of the accommodation.

### `api/cuisine`

- `name`: The name of the cuisine.
- `description`: A brief description of the cuisine.

### `api/transport`

- `mode`: The mode of transportation (e.g., bus, train, taxi).
- `description`: A brief description of the transportation mode.

### `api/weather`

- `location`: The location for which weather information is requested.
- `temperature`: The current temperature at the specified location.
- `condition`: The current weather condition (e.g., sunny, rainy, cloudy).



## Request Examples

### Get Attractions

```http
GET /api/attractions?city=Paris

In this example, the `city` parameter is set to Paris. Note that when making requests to the same endpoint with a different city name, different tourist attractions will be listed according to the requested city.


