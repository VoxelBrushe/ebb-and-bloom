import { QuartzComponent, QuartzComponentConstructor } from "./types"

export const ContactForm: QuartzComponent = () => {
  return (
    <div class="contact-form">
      <h3>message in a bottle</h3>
      <form
        id="contact-form"
        action="https://formspree.io/f/mgooezed"
        method="POST"
        onsubmit="return false;"  // 👈 Prevent Formspree redirect
      >
        <label>
          <span>your name</span>
          <input type="text" name="name" required />
        </label>

        <label>
          <span>your email</span>
          <input type="email" name="email" required />
        </label>

        <label>
          <span>your message</span>
          <textarea name="message" rows={4} required></textarea>
        </label>

        <button type="submit">release</button>
      </form>

      <p id="contact-status" class="contact-status" style="display:none"></p>

      <script is:inline>
        {String.raw`
          document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contact-form');
            const status = document.getElementById('contact-status');
            if (!form) return;

            function setStatus(lines, cssClass) {
              status.style.display = 'block';
              status.className = 'contact-status ' + cssClass;
              status.innerHTML = ''; // Clear previous
              lines.forEach((line, i) => {
                const span = document.createElement('span');
                span.textContent = line;
                status.appendChild(span);
                if (i < lines.length - 1) status.appendChild(document.createElement('br'));
              });
            }

            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();

              setStatus(['🍾 sending...'], 'contact-sending');

              const data = new FormData(form);
              try {
                const response = await fetch(form.action, {
                  method: 'POST',
                  body: data,
                  headers: { Accept: 'application/json' },
                });

                if (response.ok) {
                  form.reset();
                  setStatus(['🍾thank you!', 'your message is in the currents.'], 'contact-success');
                } else {
                  setStatus(['💦 the bottle broke.', 'please send another.'], 'contact-error');
                }

                // Fade-out after 6s
                setTimeout(() => {
                  status.classList.add('fade-out');
                  setTimeout(() => {
                    status.style.display = 'none';
                    status.classList.remove('fade-out');
                    status.innerHTML = '';
                  }, 1200);
                }, 6000);

              } catch (error) {
                setStatus(['🛟 the tide turned.', 'please try again later.'], 'contact-error');
              }
            });
          });
        `}
      </script>
    </div>
  )
}

ContactForm.css = `
/* =========================================================
   CONTACT FORM — RIGHT SIDEBAR (NORD THEME)
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
}

.contact-form h3 {
  font-size: 1.4rem !important;
  font-weight: 600 !important;
  margin: 0 0 1rem 0 !important;
  text-align: center;
}

/* Header Colors */
[saved-theme="dark"] .contact-form h3 {
  color: #8FBCBB !important;
}

[saved-theme="light"] .contact-form h3 {
  color: #5E81AC !important;
}

/* Form layout */
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

/* Input fields */
.contact-form input,
.contact-form textarea {
  padding: 0.6rem;
  border: 1px solid #D08770;
  border-radius: 0;
  font-family: inherit;
  font-size: 0.9rem;
  transition: border-color 0.2s, background-color 0.2s;
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

/* Focus styling */
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #5E81AC;
}

/* Button */
.contact-form button {
  padding: 0.6rem 1.2rem;
  background-color: #D08770;
  color: #ECEFF4;
  border: none;
  border-radius: 0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}

.contact-form button:hover {
  background-color: #EBCB8B;
  color: #2E3440;
}

/* =========================================================
   STATUS MESSAGES — MINIMAL STYLE
   ========================================================= */

.contact-status {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.5;
  opacity: 1;
  transition: opacity 0.5s ease;
}

/* Sending */
.contact-sending {
  color: #5E81AC;
}

/* Success */
.contact-success {
  color: #D08770;
}

/* Error */
.contact-error {
  color: #BF616A;
}

/* Fade-out animation */
.fade-out {
  opacity: 0;
}
`

export default (() => ContactForm) satisfies QuartzComponentConstructor
