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

export default (() => ContactForm) satisfies QuartzComponentConstructor
