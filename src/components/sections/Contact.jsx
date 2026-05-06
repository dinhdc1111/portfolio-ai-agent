import { useState } from 'react'
import { SectionWrapper, SectionHeader } from '../ui'

const initialForm = { name: '', email: '', message: '' }

const Contact = () => {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your actual form-submission logic (EmailJS, Formspree, etc.)
    setTimeout(() => {
      setStatus('success')
      setForm(initialForm)
    }, 1200)
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Have a project in mind? Let's talk."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-5"
        noValidate
      >
        {[
          { id: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
          {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'john@example.com',
          },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              value={form[id]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-400 text-sm text-center">
            Message sent! I'll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </SectionWrapper>
  )
}

export default Contact
