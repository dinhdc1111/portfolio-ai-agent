const SectionWrapper = ({ id, className = '', children }) => {
  return (
    <section
      id={id}
      className={`min-h-screen px-6 py-24 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  )
}

export default SectionWrapper
