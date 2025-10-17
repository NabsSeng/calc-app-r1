# Simple Calculator App

## Overview
This is a simple, client-side web-based calculator application built using HTML, CSS, and JavaScript. It provides basic arithmetic operations (addition, subtraction, multiplication, and division) within a user-friendly and responsive interface. Designed for static hosting environments like GitHub Pages, it runs entirely in the browser without any server-side components.

## Features
*   **Basic Arithmetic Operations:** Supports addition (+), subtraction (-), multiplication (*), and division (/).
*   **Clear & Delete:** `C` button to clear all input, `DEL` button to delete the last digit.
*   **Decimal Support:** Allows for floating-point calculations.
*   **Error Handling:**
    *   Prevents multiple decimal points in a single number.
    *   Handles division by zero gracefully, displaying an appropriate error message.
    *   Provides feedback for invalid operations.
*   **Responsive Design:** Adapts to various screen sizes, ensuring usability on both desktop and mobile devices.
*   **Intuitive UI:** Clean and modern interface with clear button layouts.
*   **URL Parameter Handling:** Supports an `?initialValue=` URL parameter to pre-populate the calculator's display with a starting number.
*   **Modern Web Technologies:** Built with ES6+ JavaScript, CSS3, and HTML5.

## Technologies Used
*   **HTML5:** For structuring the web page content.
*   **CSS3:** For styling the calculator and ensuring responsiveness.
*   **JavaScript (ES6+):** For all application logic, calculations, and interactive elements.

## How to Use
1.  **Input Numbers:** Click the number buttons (0-9) or use your keyboard's number keys to enter digits.
2.  **Add Decimal:** Click the `.` button to add a decimal point (only one per number is allowed).
3.  **Select Operation:** Click one of the operator buttons (+, -, *, /) to choose an arithmetic operation.
4.  **Perform Calculation:** Click the `=` button to see the result.
5.  **Clear All:** Click the `C` button to reset the calculator display and state.
6.  **Delete Last Digit:** Click the `DEL` button to remove the last entered digit from the current number.

### Using URL Parameters
You can pre-fill the calculator's display by adding `?initialValue=` followed by a number to the URL.
**Example:** `https://yourusername.github.io/calc-app/?initialValue=123.45` will start the calculator with `123.45` on its display.

## Installation & Deployment
Since this is a client-side application, there is no traditional "installation" required.

### Local Development
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/calc-app.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd calc-app
    ```
3.  Open `index.html` in your web browser.

### Deployment to GitHub Pages
1.  Push your repository to GitHub.
2.  Go to your repository settings on GitHub.
3.  Navigate to the "Pages" section.
4.  Under "Build and deployment", select "Deploy from a branch" and choose your `main` (or `master`) branch and `/root` (or `docs` if you place files there) as the source.
5.  Save the changes. GitHub Pages will then deploy your application, usually accessible at `https://yourusername.github.io/your-repository-name/`.

## Error Handling
The application provides explicit error messages for common issues:
*   **Division by Zero:** Attempting to divide any number by zero will display "Error: Div by Zero".
*   **Invalid Number Input:** The calculator prevents entering multiple decimal points in a single number.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Author
[Your Name/Organization]