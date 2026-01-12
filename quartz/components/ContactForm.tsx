import { QuartzComponentConstructor, QuartzComponent } from "./types"

const ContactForm: QuartzComponentConstructor = () => {
  const ContactFormComponent: QuartzComponent = () => {
    return (
      <div class="contact-form" lang="en">
        <h3>get in touch</h3>
        <form action="https://formspree.io/f/mgooezed" method="POST">
          <label>
            your email:
            <input type="email" name="email" placeholder="hello@example.com" required />
          </label>
          <label>
            your message:
            <textarea name="message" placeholder="what's on your mind?" required></textarea>
          </label>
          <input type="hidden" name="_next" value="https://ebb-and-bloom.com/contact-success" />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }

  return ContactFormComponent
}

export default ContactForm