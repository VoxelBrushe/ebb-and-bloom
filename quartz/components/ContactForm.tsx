import { QuartzComponentConstructor, QuartzComponent } from "./types"

const ContactForm: QuartzComponentConstructor = () => {
  const ContactFormComponent: QuartzComponent = () => {
    const handleSubmit = (e: Event) => {
        console.log("Form submitted!")  // Add this
      e.preventDefault()
      
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      console.log("Sending to worker...")  // And this
      
      fetch('https://contact-form.voxelbrushe.workers.dev', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          // Show success and redirect
          window.location.href = 'https://ebb-and-bloom.com/contact-success/'
        }
      })
      .catch(error => console.error('Error:', error))
    }

    return (
      <div class="contact-form" lang="en">
        <h3>get in touch</h3>
        <form onSubmit={handleSubmit}>
          <label>
            your email:
            <input type="email" name="email" placeholder="hello@example.com" required />
          </label>
          <label>
            your message:
            <textarea name="message" placeholder="what's on your mind?" required></textarea>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }

  return ContactFormComponent
}

export default ContactForm