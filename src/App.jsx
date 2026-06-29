import Header from './components/Header.jsx';
import StableSeer from './StableSeer.jsx';

export default function App() {
  return (
    <div
      data-testid="app"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
    >
      <Header />
      <main style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <StableSeer />
      </main>
    </div>
  );
}
