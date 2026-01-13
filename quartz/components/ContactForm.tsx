import { QuartzComponent, QuartzComponentConstructor } from "./types"

export const ContactForm: QuartzComponent = () => {
  return (
    <div class="contact-form-container">
      <h3 class="contact-form-title">Get in Touch</h3>
      <form
        action="https://formspree.io/f/mgooezed"
        method="POST"
        class="contact-form"
      >
        {/* Hidden redirect field */}
        <input type="hidden" name="_redirect" value="/contact-success" />

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
          <textarea name="message" rows="4" required></textarea>
        </label>

        <button type="submit">Send</button>
      </form>
    </div>
  )
}

ContactForm.css = `
/* =========================================================
   CONTACT FORM — SIDEBAR NORD STYLE
   ========================================================= */

.contact-form-container {
  margin-top: 1.5rem !important;
  padding: 1rem !important;
  border: 1.5px solid #D8DEE9 !important;
  border-radius: 6px !important;
  background-color: rgba(216, 222, 233, 0.2);
  box-sizing: border-box;
}

[saved-theme="dark"] .contact-form-container {
  border-color: #4C566A !important;
  background-color: rgba(46, 52, 64, 0.5);
}

.contact-form-title {
  font-size: 1.2rem !important;
  font-weight: 600 !important;
  margin-bottom: 0.75rem !important;
  color: #5E81AC !important;
}

[saved-theme="dark"] .contact-form-title {
  color: #8FBCBB !important;
}

.contact-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
}

.contact-form label {
  display: flex !important;
  flex-direction: column !important;
  font-size: 0.85rem !important;
  color: #2E3440 !important;
}

[saved-theme="dark"] .contact-form label {
  color: #ECEFF4 !important;
}

.contact-form input,
.contact-form textarea {
  margin-top: 0.25rem !important;
  padding: 0.45rem 0.6rem !important;
  border: 1px solid #D8DEE9 !important;
  border-radius: 4px !important;
  background-color: #ECEFF4 !important;
  color: #2E3440 !important;
  font-family: inherit !important;
  font-size: 0.85rem !important;
  resize: vertical !important;
}

[saved-theme="dark"] .contact-form input,
[saved-theme="dark"] .contact-form textarea {
  background-color: #3B4252 !important;
  border-color: #4C566A !important;
  color: #ECEFF4 !important;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none !important;
  border-color: #5E81AC !important;
  box-shadow: 0 0 0 2px rgba(94, 129, 172, 0.3);
}

.contact-form button {
  align-self: flex-end !important;
  padding: 0.4rem 1rem !important;
  background-color: #5E81AC !important;
  color: #ECEFF4 !important;
  font-weight: 600 !important;
  border: none !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.contact-form button:hover {
  background-color: #81A1C1 !important;
  transform: translateY(-1px);
}

.contact-form button:active {
  transform: translateY(0);
}
`

export default (() => ContactForm) satisfies QuartzComponentConstructor
