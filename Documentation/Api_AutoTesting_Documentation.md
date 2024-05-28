Automated Testing Documentation
Access the Postman collection for API testing at the following link:

https://universal-resonance-666434.postman.co/workspace/TravelPlanner~286f0a99-86fb-4013-8c52-09597075ed06/collection/26744065-4dc40742-88bb-4da3-8251-9f9ef0c1dc49?action=share&creator=26744065

Test 1: Verify HTTP Status Code for GET Request

* Expected Result : Status code: 200 OK
* Steps : Send a GET request to http://localhost:3000/api/transports.
* Actual Result: Status code: 200 OK
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 2: Verify API Response Data Format for JSON

* Expected Result :The response data is formatted as JSON.
* Steps : Send a GET request to http://localhost:3000/api/accommodations
* Actual Result :The response data is formatted as JSON.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 3: Verify Correct HTTP Status Code for Invalid Request

* Expected Result : The API returns status code 404 Not found.
* Steps : Send a POST request to http://localhost:3000/api/attractions
* Actual Result :The API returns status code 404 Not found.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 4: Test API with Specific Filters

* Expected Result : The API returns transports that match the specified criteria.
* Steps : Send a GET request to http://localhost:3000/api/transports?mode=tramway
* Actual Result : API transports can not be filtered as they should be.
* Difficulty: During the testing process, the desired filtering did not occur because the data did not arrive as it should.

Test 5: Verify API Pagination

* Expected Result: The API returns paginated results according to the specified pagination parameters:
* Steps : Send a GET request to http://localhost:3000/api/attractions?category?page=1&limit=10
* Actual Result: The API returns paginated results as expected.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 6: Check API Handling of Special Characters and Non-English Text

* Expected Result : The API should handle the input data containing special characters and non-English text without errors.
* Steps : Send a POST request to http://localhost:3000/api/attractions
* Actual Result : The API successfully handles the input data with special characters and non-English text.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 7: Test API Response with Concurrent Requests

* Expected Result : The API should handle the concurrent requests gracefully and maintain data consistency. 
* Steps : Send a GET request to http://localhost:3000/api/attractions?city
* Actual Result : The API successfully handles concurrent requests without errors or data inconsistencies.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 8: Test API Handling of Different HTTP Methods

* Expected Result : For each HTTP method and endpoint:
GET: The API should return the expected data and status code (e.g., 200 OK).
POST: The API should create a new resource and return a status code indicating success (e.g., 201 Created).
PUT: The API should update an existing resource and return a status code indicating success (e.g., 200 OK).
DELETE: The API should delete the specified resource and return a status code indicating success (e.g., 200 OK).

* Actual Result
GET: The API returns the expected data and status codes 200 OK for each endpoint.
POST: The API successfully creates new resources and returns status codes 201.
PUT: The API successfully updates existing resources and returns status codes 200.
DELETE: The API successfully deletes resources and returns status codes 200.

Test 9: Test API Handling of Record Updates

* Expected Result : The API should update the existing record with the new data and return a status code 200 OK. The updated record should reflect the changes made.
* Steps : Send a GET request to
* Actual Result
PUT status code: 200 OK The API successfully updated the existing record, and the changes were reflected in subsequent requests.

Test 13: Verify API Rate Limiting

* Expected Result
For the first 100 requests, expect a status code of 200.
For the 101st request, expect a status code of 429 and the error message "Too many requests from this IP, please try again in 15 minutes."

* Actual Result
The first 100 requests return a status code of 200.
The 101st request returns a status code of 429, indicating rate limiting, and includes the expected error message.
"För många förfrågningar från denna IP, försök igen om en stund."




