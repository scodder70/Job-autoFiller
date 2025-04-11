# Job_Application_Auto-filler 🚀

**Job_Application_Auto-filler** is a Chrome extension designed to make job hunting easier. Simply upload your resume in PDF format, and this tool will automatically scan your data and autofill job applications on popular portals. You can also manually edit the fields before submitting.

 📽️ Demo Video

🎬 [Click to watch the demo](https://streamable.com/tom58r)

## 🛠 Features

- 🧠 **Auto-parsing**: Extracts your Name, Email, Phone, GitHub, LinkedIn, Domain, and Skills from your uploaded resume PDF.
- ⚙️ **Manual edit support**: Update any field before submitting.
- 🌐 **Cross-platform compatibility**: Works on all major job search websites.
- 🔒 **Local processing**: No data is sent to any server unless explicitly saved by the user.

---

## 🚀 How to Install

1. **Clone or Download** this repo.

2. (Optional) If there is a build setup (like Vite/Webpack), run:

   ```bash
   npm install
   ```

3. Go to **Google Chrome** and open:

   ```
   chrome://extensions/
   ```

4. Enable **Developer Mode**.

5. Click **"Load Unpacked"** and select the folder that contains `manifest.json`.

6. You should see the extension icon in the toolbar — you're ready to use it!

---

## 🧪 Demo

> Watch how it works in real-time:

🎬 [Click to view demo](./Screen Recording 2025-04-11 211929.mp4)

---

## 🧾 Tech Stack

- 🧩 JavaScript, React (Frontend)
- 🧠 Node.js, Express, pdf-parse (Backend Resume Parser)
- 🔐 JWT for secure auth
- ☁️ MongoDB for optional user data storage

---

## 📁 Directory Structure

```
job-autofiller/
├── backend/
│   ├── server.js
│   └── parse-resume.js
├── frontend/
│   └── popup.html
│   └── content.js
├── public/
│   └── assets/
├── manifest.json
├── README.md
└── .env
```

---

## ▶️ How to Run the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with:

   ```env
   PORT=3004
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:

   ```bash
   node server.js
   ```

---

## 🚀 How to Use the Extension

1. Start the backend using `node server.js`.

2. Go to the extension popup.

3. Login or Sign up.

4. Upload your resume in PDF format.

5. Edit details if needed and click **Submit** to save your profile.

6. Open any job application website.

7. Click the extension icon and hit **"Auto Fill"** — your details will be filled automatically in matching fields.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📜 License

[MIT](LICENSE)
