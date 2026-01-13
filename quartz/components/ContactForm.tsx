import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { useState } from "preact/hooks"

const ContactFormComponent = (props: QuartzComponentProps) => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    setStatus("sending")

    const data = new FormData(form)
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })

    if (response.ok) {
      setStatus("sent")
      form.reset()
    } else {
      setStatus("error")
    }
  }

  return (
    <div class="contact-form">
      <h3>Get in Touch</h3>

      {status === "sent" ? (
        <p class="contact-success">🌿 Thank you! Your message has been sent successfully.</p>
      ) : (
        <form onSubmit={handleSubmit} action="https://formspree.io/f/mgooezed" method="POST">
          <label>
            <span>Your name</span>
            <input type="text" name="name" required />
          </label>

          <label>
            <span>Your email</span>
            <input type="email" name="email" required />
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows={4} required></textarea>
          </label>

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p class="contact-error">⚠️ Oops! Something went wrong. Please try again later.</p>
      )}
    </div>
  )
}

ContactFormComponent.css = `
/* =========================================================
   CONTACT FORM — RIGHT SIDEBAR
   ========================================================= */

.contact-form {
  width: 100%;
  margin-top: 1.5rem !important;
  padding: 1rem !important;
  box-sizing: border-box;
}

[saved-theme="dark"] .contact-form {
  background-color: #2E3440 !important;
}

[saved-theme="light"] .contact-form {
  background-color: #D8DEE9 !important;
  border-radius: 0px;
}

.contact-form h3 {
  font-size: 1.4rem !important;
  font-weight: 600 !important;
  margin: 0 0 1rem 0 !important;
}

/* Dark mode title */
[saved-theme="dark"] .contact-form h3 {
  color: #8FBCBB !important;
}

/* Light mode title */
[saved-theme="light"] .contact-form h3 {
  color: #5E81AC !important;
}

/* Form styling */
.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 0.3rem;
}

[saved-theme="light"] .contact-form label {
  color: #2E3440 !important;
}

[saved-theme="dark"] .contact-form label {
  color: #D8DEE9 !important;
}

.contact-form input,
.contact-form textarea {
  padding: 0.5rem;
  border: 1px solid #D08770;
  border-radius: 3px;
  font-family: inherit;
  font-size: 0.9rem;
}

[saved-theme="light"] .contact-form input,
[saved-theme="light"] .contact-form textarea {
  background-color: #E5E9F0;
  color: #2E3440;
}

[saved-theme="dark"] .contact-form input,
[saved-theme="dark"] .contact-form textarea {
  background-color: #3B4252;
  color: #D8DEE9;
}

.contact-form button {
  padding: 0.5rem 1rem;
  background-color: #D08770;
  color: white;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.contact-form button:hover {
  opacity: 0.9;
}

/* Success + error messages */
.contact-success,
.contact-error {
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 3px;
  margin-top: 0.5rem;
}

.contact-success {
  background-color: rgba(163, 190, 140, 0.15);
  color: #A3BE8C;
}

.contact-error {
  background-color: rgba(191, 97, 106, 0.15);
  color: #BF616A;
}

.contact-success,
.contact-error {
  transition: opacity 0.3s ease-in-out;
}
`

// ✅ Tell Quartz this component needs client-side hydration
ContactFormComponent.hydration = "client"

export default (() => ContactFormComponent) satisfies QuartzComponentConstructor
