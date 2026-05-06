export const NAV_LINKS = [
  { id: 'home',     label: 'Home',     tx: 'TX-01' },
  { id: 'about',    label: 'Mission',  tx: 'TX-02' },
  { id: 'projects', label: 'Artifacts',tx: 'TX-03' },
  { id: 'skills',   label: 'Systems',  tx: 'TX-04' },
  { id: 'contact',  label: 'Channel',  tx: 'TX-05' },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Orbital Interface',
    description: 'A real-time satellite telemetry dashboard with WebGL globe and live data streams.',
    tags: ['React', 'Three.js', 'WebSockets', 'Node.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    coord: '47.2°N · 122.4°W',
  },
  {
    id: 2,
    title: 'Deep Field',
    description: 'Generative art engine that renders procedural star systems using GPU-accelerated shaders.',
    tags: ['WebGL', 'GLSL', 'Canvas API', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
    coord: '12.7°S · 209.1°E',
  },
  {
    id: 3,
    title: 'Signal Protocol',
    description: 'End-to-end encrypted messaging platform with E2EE, zero-knowledge proofs, and WebRTC.',
    tags: ['Rust', 'WebRTC', 'ZK-Proofs', 'React'],
    github: 'https://github.com',
    live: 'https://example.com',
    coord: '33.9°N · 18.4°E',
  },
]

export const SKILLS = [
  { name: 'React / R3F',   level: 92, angle: 0   },
  { name: 'TypeScript',    level: 87, angle: 60  },
  { name: 'Node.js',       level: 82, angle: 120 },
  { name: 'Three.js',      level: 78, angle: 180 },
  { name: 'GLSL / WebGL',  level: 70, angle: 240 },
  { name: 'Python',        level: 72, angle: 300 },
]

export const TIMELINE = [
  { year: '2024–now', role: 'Senior Interface Engineer', place: 'Deep Space Labs' },
  { year: '2022–24',  role: 'Creative Developer',         place: 'Nebula Studio' },
  { year: '2020–22',  role: 'Frontend Engineer',          place: 'Orbit Systems' },
]

