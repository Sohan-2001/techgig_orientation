# 📱 Prompt Orientation App

> A mobile-first web application that dynamically responds to device orientation to display: Alarm Clock (Portrait), Stopwatch (Landscape), Timer (Upside-Down), and Weather of the Day. Built for the **"Prompt This Into Existence!" Hackathon**.

---

## 🔗 Live Demo

🌐 techgig-orientation.vercel.app

---

## 🧠 About the Challenge

The task was to build a one-page, mobile-responsive app using AI-first development techniques that changes functionality based on how the user holds their device:

* **Portrait (Upright)** → Alarm Clock ⏰
* **Landscape (Right-side)** → Stopwatch ⏱️
* **Portrait (Upside Down)** → Timer ⏳
* **Landscape (Left-side)** → Weather of the Day 🌤️

All features were to be implemented using in-browser JavaScript APIs, and the project had to run entirely on mobile browsers (no native app).

---

## 🧑‍💻 Developed By

**Sohan Karfa**

---

## ⚙️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Hosting:** [Vercel](https://vercel.com/)
* **AI Tool:** [Firebase Studio (AI-Powered)](https://firebase.google.com/)
* **Weather API:** [WeatherAPI.com](https://www.weatherapi.com)

---

## 💡 AI Tools & Prompting

### Tools Used:

* **Firebase Studio** – used to generate the initial app UI and logic via instruction-based prompting.
* **ChatGPT (GPT-4o)** – for logic fixes, responsive tweaks, API handling, and caching.
* **Gemini Pro** – for script and visual planning of the short demo video.

### Prompting Technique:

I followed a **goal-driven instruction-based prompting** approach:

1. Initially provided the full Hackathon brief as a single prompt to Firebase Studio → Generated complete base app.
2. Then used **iterative prompts** to:

   * Add alarm functionality
   * Integrate the Weather API
   * Add caching for performance

This step-by-step refinement offered speed, control, and high code quality.

---

## 🚀 Installation

This project was originally built using **Firebase Studio**, pushed to GitHub, and deployed via **Vercel**.

### 🔧 To run locally:

```bash
git clone https://github.com/your-username/prompt-orientation-app.git
cd prompt-orientation-app
npm install
npm run dev
```

> ⚠️ Requires a modern browser with support for `DeviceOrientationEvent`.

### 🌐 View Live:

[https://prompt-orientation-app.vercel.app](https://prompt-orientation-app.vercel.app)

---

## 📸 Screenshots

| Orientation               | Feature        |
| ------------------------- | -------------- |
| 📱 Portrait (Upright)     | Alarm Clock UI |
| 📱 Portrait (Upside Down) | Timer UI       |
| 📱 Landscape (Right-side) | Stopwatch UI   |
| 📱 Landscape (Left-side)  | Weather Info   |

---

## 📁 Folder Structure
```
├── .idx/
├── .next/
├── docs/
├── node_modules/
├── src/
│   ├── (your source files)
├── .env.local
├── .gitignore
├── .modified
├── apphosting.yaml
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
```


---

## 📌 Demo Video

## 📌 Demo Video
A 2-minute demo video showcasing all orientation modes has been included in the submission.

▶️ [Watch Demo Video](https://sxldi6vsg8pc7vjq.public.blob.vercel-storage.com/Recording%202025-08-04%20031907.mp4)

---

## 📜 License

MIT © 2025 [Sohan Karfa](https://github.com/your-username)

---

## 🙌 Acknowledgements

* Open-Meteo API for free weather data
* Firebase Studio AI for instant scaffolding
* ChatGPT and Gemini for coding, debugging, and storytelling assistance
