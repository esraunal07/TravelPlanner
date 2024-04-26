Automated Testing Documentation
Access the Postman collection for API testing at the following link:

https://universal-resonance-666434.postman.co/workspace/TravelPlanner~286f0a99-86fb-4013-8c52-09597075ed06/collection/26744065-4dc40742-88bb-4da3-8251-9f9ef0c1dc49?action=share&creator=26744065

Test 1: Verify HTTP Status Code for GET Request

* Expected Result : Status code: 200 OK
* Actual Result: Status code: 200 OK
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 2: Verify API Response Data Format for JSON

* Expected Result :The response data is formatted as JSON.
* Actual Result :The response data is formatted as JSON.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 3: Verify Correct HTTP Status Code for Invalid Request

* Expected Result : The API returns status code 404 Not found.
* Actual Result :The API returns status code 404 Not found.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 4: Test API with Specific Filters

* Expected Result : The API returns transports that match the specified criteria.
* Actual Result : API transports can not be filtered as they should be.
* Difficulty: During the testing process, the desired filtering did not occur because the data did not arrive as it should.

Test 5: Verify API Pagination

* Expected Result: The API returns paginated results according to the specified pagination parameters:
* Actual Result: The API returns paginated results as expected.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 6: Check API Handling of Special Characters and Non-English Text

* Expected Result : The API should handle the input data containing special characters and non-English text without errors.
* Actual Result : The API successfully handles the input data with special characters and non-English text.
* Difficulty: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Test 7: Test API Response with Concurrent Requests

* Expected Result : The API should handle the concurrent requests gracefully and maintain data consistency. 
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
* Actual Result
PUT status code: 200 OK The API successfully updated the existing record, and the changes were reflected in subsequent requests.


