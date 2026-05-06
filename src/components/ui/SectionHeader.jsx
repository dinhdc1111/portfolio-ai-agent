const SectionHeader = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-gray-400 text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}

export default SectionHeader
