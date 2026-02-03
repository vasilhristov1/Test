import "./App.css";

export default function App() {
  async function sendEmail() {
    try {
      const res = await fetch("http://localhost:3000/send-email", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email");
      }
    } catch {
      alert("Server error");
    }
  }

  return (
    <div className="page">
      <h1>My Simple App</h1>

      <p>This button sends a fixed email.</p>

      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}
