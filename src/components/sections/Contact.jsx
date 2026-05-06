import { useEffect, useRef, useState } from 'react'

const FIELDS = [
  { name: 'callsign', label: 'CALL SIGN', type: 'text', placeholder: 'Your name' },
  { name: 'frequency', label: 'FREQUENCY', type: 'email', placeholder: 'Your email' },
  { name: 'message', label: 'MESSAGE BODY', type: 'textarea', placeholder: 'Your transmission...' },
]

const inputCls = [
  'w-full px-4 py-3 rounded-sm',
  'bg-white/5 border border-white/10',
  'text-[var(--white)] placeholder:text-white/30',
  'focus:outline-none focus:border-[var(--signal)]/60 focus:bg-white/8',
  'transition-colors duration-200',
].join(' ')

const Contact = () => {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ callsign: '', frequency: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add('in-view'),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to your API / EmailJS / Formspree
    setSent(true)
  }

  return (
    <section id='contact' ref={sectionRef} className='section-animate relative min-h-screen flex flex-col justify-center px-6 py-20 md:px-16 lg:px-28'>
      <span className='hud-corner hud-corner--tl' />
      <span className='hud-corner hud-corner--tr' />
      <span className='hud-corner hud-corner--bl' />
      <span className='hud-corner hud-corner--br' />

      <div className='mb-10'>
        <p className='data-readout text-[var(--signal)] mb-2'>── OPEN CHANNEL ──</p>
        <h2 className='text-4xl md:text-5xl font-bold' style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}>Contact</h2>
        <p className='data-readout mt-2 opacity-60'>Transmission range: unlimited</p>
      </div>

      <div className='max-w-xl w-full pointer-events-auto'>
        {sent ? (
          <div className='p-8 border border-[var(--signal)]/30 rounded-sm text-center'>
            <p className='text-2xl font-bold mb-3 signal-glow' style={{ fontFamily: 'var(--font-display)', color: 'var(--signal)' }}>SIGNAL SENT</p>
            <p className='data-readout opacity-70'>Your message is travelling at the speed of light.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className='space-y-5'>
            {FIELDS.map((f) => (
              <div key={f.name}>
                <label className='data-readout block mb-2 text-[var(--signal)]'>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    rows={5}
                    required
                    className={inputCls + ' resize-none'}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
                  />
                ) : (
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required
                    className={inputCls}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
                  />
                )}
              </div>
            ))}

            <button
              type='submit'
              className='w-full py-3 px-6 border border-[var(--signal)] text-[var(--signal)] font-semibold tracking-widest hover:bg-[var(--signal)] hover:text-[var(--void)] transition-colors duration-300'
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              TRANSMIT
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Contact