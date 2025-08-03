# Orientime

This is a Next.js starter project built in Firebase Studio. It's an orientation-aware application that presents different time-based tools depending on how you hold your device.

## Hackathon Evaluation

Here's how Orientime addresses the evaluation criteria for the hackathon.

### 1. Functionality

The application's core concept is to provide different utilities based on the device's screen orientation. This functionality is robust and works as expected across various mobile device states.

-   **Orientation-based Controllers:** Yes, all features work reliably as the orientation changes. The app uses a custom React hook (`useOrientation`) to listen for `screen.orientation` changes and dynamically renders the appropriate component:
    -   **Portrait (upright):** Alarm Clock
    -   **Landscape (right-side up):** Stopwatch
    -   **Portrait (upside down):** Timer
    -   **Landscape (left-side up):** Weather
-   **Feature Completeness:** All core features are fully implemented:
    -   **Alarm:** Users can add multiple alarms, toggle them on/off, delete them, and are alerted with an audio notification when an alarm time is reached. Alarms persist in `localStorage`.
    -   **Stopwatch:** Includes start, pause, reset, and lap functionality. Laps are displayed in a scrollable list.
    -   **Timer:** Users can set a countdown duration, start, pause, and reset the timer. A progress bar visually represents the time remaining.
    -   **Weather:** Automatically fetches and displays local weather data based on the user's geolocation, complete with caching to reduce API calls and improve load times.

### 2. User Experience (UX)

The UX is designed to be intuitive, clean, and delightful, adhering to modern design principles.

-   **Intuitiveness:** The interface is straightforward. A welcome screen clearly explains the app's unique, orientation-based navigation. Each feature is presented as a single-purpose, full-screen "card," making it easy to understand and use.
-   **Responsiveness:** The app is built with a mobile-first approach. Layouts adapt seamlessly to portrait and landscape orientations, ensuring all content is legible and interactive elements are easily accessible.
-   **Visual Appeal:** The design uses the **ShadCN** component library and **Tailwind CSS**, following the specified style guidelines (Sky Blue primary, Light Gray background, Orange accent). The result is a clean, aesthetically pleasing interface with a professional feel.
-   **Feedback & Interaction:** The app provides clear feedback.
    -   Buttons and controls have clear states (e.g., disabled, active).
    -   Smooth, subtle animations (`fade-in`, `zoom-in`) on orientation changes make transitions feel polished.
    -   The app uses toasts for errors (e.g., location permission denied) and dialogs for critical alerts (like an alarm ringing).

### 3. AI Prompting & Development Process

This project was developed in partnership with an AI assistant, which significantly accelerated the development process. The collaboration focused on clear, iterative prompting to build, refine, and debug the application.

-   **Efficiency & Effectiveness:** The AI was used for a wide range of tasks, from initial scaffolding to complex logic and bug fixing. This was highly efficient, turning high-level feature requests into complete, working code with minimal manual intervention. For example, requests like "create a stopwatch component" or "add caching to the weather feature" were handled in a single turn.
-   **Prompting Techniques:**
    -   **Instruction-Based Prompting:** Simple, direct commands were used for initial feature creation and modifications (e.g., "Create a .env file and add the API key").
    -   **Contextual Refinement:** The AI was given context about the existing code and project requirements to make intelligent modifications. For instance, when asked to fix a bug, I provided the exact error message from Next.js, which the AI used to identify the root cause (JSX in a `.ts` file) and implement the correct fix.
    -   **High-Level Abstraction:** Instead of writing code line-by-line, I made high-level requests based on user stories (e.g., "Use local caching to load the components faster"), which the AI translated into a complete technical implementation.

### 4. Technical Implementation

The project is built on a modern, robust tech stack and follows best practices for web development.

-   **Code Quality:** The code is clean, readable, and organized into logical components. It uses **TypeScript** for type safety and modern React features like functional components and hooks (`useState`, `useEffect`, `useRef`).
-   **Efficiency:** The app is performant.
    -   It uses Next.js with the App Router for efficient page loads.
    -   Client-side rendering is used judiciously (`"use client"`), and server components are preferred by default.
    -   The weather component implements caching via `localStorage` to minimize API requests and provide an instant-loading experience for repeat users.
-   **Best Practices:**
    -   **Next.js:** Follows App Router conventions.
    -   **React:** Utilizes hooks for state management and side effects, avoiding class components.
    -   **TypeScript:** All components and hooks are strongly typed.
    -   **Environment Variables:** API keys are stored securely in a `.env` file and not exposed on the client side where not needed.
-   **Documentation:** While the code is largely self-documenting due to its clarity, this `README` serves as comprehensive project documentation, explaining the architecture and design choices.

### 5. Wow! Factor

The project includes several features and polished details that go beyond a basic implementation.

-   **Creative Core Concept:** The primary navigation method—changing device orientation—is itself a unique and innovative take on user interaction for a mobile web app.
-   **Polished Micro-interactions:** Smooth, non-jarring animations on orientation changes and subtle UI feedback make the app feel alive and delightful to use.
-   **Persistence:** The app remembers the user's alarms between sessions by using `localStorage`, adding a layer of practical usefulness.
-   **Intelligent Caching:** The weather feature not only caches data but also ties the cache to the user's location. It will only use cached data if the user is in the same approximate location as when the data was last fetched, ensuring relevance.
-   **Zero-Config Welcome:** The welcome screen elegantly onboards the user to the app's unconventional navigation, ensuring they understand how to use it from the very first launch.
