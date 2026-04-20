# News Explorer

A responsive news application built with **React** and **Vite** that allows users to explore global news articles, search by keyword, and apply advanced filters using the **NewsAPI.ai** (Event Registry) API.

**Deployment:** https://jeffer512.github.io/react-news-app/

## Features
*   **Search & Discover:** Search for global news by keyword with URL-based routing.
*   **Filtering:** Filter results by multiple categories and date ranges.
*   **Dark Mode:** Integrated theme toggle with persistent settings using CSS variables.
*   **Responsive Design:** Fully optimized for desktop, tablet, and mobile using CSS Grid and Flexbox.

## Technical Implementation:
*   **Token-Efficient Pagination:** To optimize API usage, the app fetches 100 articles at once and "sub-paginates" them into local slices of 10. New network requests are only triggered when the user crosses the 100-article boundary or modifies search/filtering criteria.
*   **Centralized State Management:** Uses the React Context API to centralize filters and pagination. This architecture ensures that search criteria are preserved during navigation and allows for atomic state updates, preventing "double-fetch" scenarios when multiple filters change simultaneously.
*   **Race Condition Protection:** Implements an `isActive` flag pattern within custom hooks to ensure that only the most recent API request updates the application state, preventing UI inconsistencies caused by out-of-order network responses.
*   **Stateful Navigation:** Passes article data through React Router's `location.state` to allow the Details page to load instantly without redundant API calls.
*   **CI/CD Pipeline:** Automated deployment to GitHub Pages using GitHub Actions.

## Tech Stack
*   **Frontend:** React.js, React Router v6, React Context API.
*   **Tooling:** Vite, Axios.
*   **Styling:** CSS3 (Variables, Grid, Flexbox).

## Setup & Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/yourusername/news-explorer.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    npm ci
    ```
3.  **Configure API Key:**
    Create a `.env` file in the root directory and add your key:
    ```env
    VITE_NEWS_API_KEY=your_api_key_here
    ```
4.  **Run the app:**
    ```bash
    npm run dev
    ```
