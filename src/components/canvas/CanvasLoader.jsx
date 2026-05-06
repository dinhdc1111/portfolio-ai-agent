import { Html, useProgress } from '@react-three/drei'

/**
 * R3F-aware loading indicator rendered inside the Canvas via <Html>.
 * Shows a progress bar and percentage while assets are loading.
 */
const CanvasLoader = () => {
  const { progress } = useProgress()

  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Spinner ring */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid rgba(145,94,255,0.2)',
          borderTopColor: '#915EFF',
          animation: 'spin 0.8s linear infinite',
        }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Progress bar */}
      <div
        style={{
          width: 120,
          height: 4,
          borderRadius: 9999,
          background: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: 9999,
            background: 'linear-gradient(90deg, #915EFF, #00d4ff)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <p style={{ color: '#915EFF', fontSize: 12, fontFamily: 'monospace' }}>
        {Math.round(progress)}%
      </p>
    </Html>
  )
}

export default CanvasLoader
