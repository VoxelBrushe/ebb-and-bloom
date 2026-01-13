import { QuartzComponentConstructor, QuartzComponent } from "./types"

const ContactForm: QuartzComponentConstructor = () => {
  const ContactFormComponent: QuartzComponent = () => {
    return (
      <div class="contact-form" lang="en">
        <h3>get in touch</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            your email:
            <input type="email" id="contact-email" placeholder="hello@example.com" required />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            your message:
            <textarea id="contact-message" placeholder="what's on your mind?" required></textarea>
          </label>
          <button onclick="handleContactSubmit()" type="button">Send</button>
        </div>
        <script>
          {`
            window.handleContactSubmit = function() {
              const email = document.getElementById('contact-email').value;
              const message = document.getElementById('contact-message').value;
              
              if (!email || !message) {
                alert('Please fill in all fields');
                return;
              }
              
              const formData = new FormData();
              formData.append('email', email);
              formData.append('message', message);
              
              fetch('https://contact-form.voxelbrushe.workers.dev', {
                method: 'POST',
                body: formData
              })
              .then(r => r.ok ? window.location.href = 'https://ebb-and-bloom.com/contact-success/' : alert('Error'))
              .catch(e => alert('Error: ' + e));
            }
          `}
        </script>
      </div>
    )
  }

  return ContactFormComponent
}

export default ContactForm