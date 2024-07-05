# Code Kata: Weather Forecast Aggregator

## Objective
Weather Forecast Aggregator: A cron job that fetches weather data from the [OpenWeatherMap API](https://openweathermap.org/api/one-call-3), parses the responses, and saves the results into a database. This application will be developed using Test-Driven Development (TDD) with an emphasis on exploring the London (mockist) and Classical (traditionalist) approaches.

For further reading on both approaches, please visit:
- [Unit Testing: Classical vs. London Approaches](https://medium.com/@r.sokolewicz/unit-testing-classical-vs-london-approaches-bc63d9088750)
- [Exploring Different Schools of Unit Testing in Python](https://blog.szymonmiks.pl/p/exploring-different-schools-of-unit-testing-in-python/)
- [Unit Testing Techniques](https://gist.github.com/xpepper/2e3519d2cb8568a0b13739d9ae497f21)

## Aspect Comparison

| Aspect               | Classical School                                                 | London (Mockist) School                                     |
|----------------------|------------------------------------------------------------------|-------------------------------------------------------------|
| **Isolation**        | Units are not isolated from each other; only the tests are isolated. | Units under test are isolated from each other.             |
| **Unit Under Test**  | A unit of behavior.                                              | A unit of code, usually a class.                           |
| **Dependencies**     | Only shared dependencies are replaced with test doubles.         | All dependencies except immutable ones are replaced with test doubles. |
| **Granularity**      | May not provide as fine-grained control as the London School.    | Provides better granularity.                                |
| **Ease of Testing**  | Less focused on ease of testing large graphs of interconnected classes. | Makes it easier to test large graphs of interconnected classes. |
| **Debugging**        | Doesn't make it particularly easy or hard to find which functionality contains a bug. | Easier to find which functionality contains a bug.          |
| **Issues**           | Does not hide issues with code design.                           | May hide issues with code design due to focus on units of code rather than units of behavior. |
| **Over-Specification** | Less likely to couple tests to the system under test's (SUT's) implementation details. | Higher risk of over-specification; tests could become coupled to the SUT's implementation details. |

## Tools and Setup

- **Language:** TypeScript
- **Testing Framework:** Jest
- **Database:** Any simple local database (like SQLite) or an in-memory database for simplicity
- **API:** OpenWeatherMap API (specifically the One Call API)

## Implementation Stages

### Part 1: TDD with the London Approach

**Objective:** Build a cron job application that fetches weather data from the OpenWeatherMap API, parses the responses, and saves the results into a database, initially using the London approach of TDD.

1. **Project Setup**
    - Set up a TypeScript project with Jest.
    - Install necessary libraries for HTTP requests (e.g., axios) and any database libraries required.

2. **Write Tests First (London Approach)**
    - Mock External Dependencies:
        - Mock the HTTP requests to the OpenWeatherMap API.
        - Mock the database interactions (insertions).
        - Mock the API Client class in the Cronjob handler.
        - Mock the Database Client in the Cronjob Handler.
        - Mock the Database in API.
        - Mock data parser wherever it’s used.
    - Test Cases:
        - Test that the system correctly schedules and triggers the cron job.
        - Test that the system fetches data using the API on schedule.
        - Test that the system parses the API response correctly.
        - Test that the system saves the correct data into the database.

3. **Implement the Features**
    - Create a cron job using a popular cron library for Node.js.
    - Implement the data fetch function using mocked API calls.
    - Implement the data parse function.
    - Implement the database storage function with mocked database calls.

### Part 2: Evolving Requirements with London Approach

**New Requirement:** The system must now also gather weather data from additional sources, e.g., another API like Weatherstack.

1. **Update Tests**
    - Add new mocks for the additional data sources.
    - Extend existing tests to check if data from both sources is fetched and merged correctly.

2. **Implement the New Features**
    - Integrate the new API similarly to the first.
    - Adjust the data parsing and saving functionalities to handle multiple sources.

### Part 3: Classical Approach

**Objective:** Refactor the existing code and tests from the London approach to the Classical approach, then adapt to changes focusing on maintainability.

1. **Remove Mocks**
    - Replace mocks with actual implementations wherever possible.
    - Keep mocks only for database and external calls.

2. **Implement Features Without Mocks**
    - Adjust the code to interact directly with the real APIs and database for testing.
    - Ensure all functionalities work correctly without mocks.

3. **Adjust to Additional Changes**
    - **New Scenario:** Now, the system needs to filter and save only certain types of weather data (e.g., excluding certain conditions).
    - **Test and Implement:** Modify tests to reflect these changes and update the implementation accordingly.

4. **Reflection**
    - Discuss or document the differences experienced in test development and maintenance between the London and Classical approaches.
    - Evaluate how each testing strategy affected the ease of adapting to new requirements and overall code quality.

This exercise will not only give developers a practical insight into the benefits and challenges of each testing methodology but also a deeper understanding of how to structure tests and code for better maintainability and adaptability in evolving scenarios.
