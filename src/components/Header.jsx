const INK = (a) => `rgba(30,26,20,${a})`;

export default function Header() {
  return (
    <header
      style={{
        background: '#FFFDF8',
        borderBottom: `1px solid ${INK(0.08)}`,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
        height: 52,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            display: 'inline-block',
            width: 18,
            height: 18,
            background: 'linear-gradient(135deg, #d76745 40%, #76281d 100%)',
            borderRadius: 1,
          }}
          aria-hidden="true"
        />
        <span style={{ fontSize: 13, fontWeight: 700, color: INK(0.88), letterSpacing: 0.3 }}>
          WalletWall
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            color: '#BF4E32',
            marginLeft: 4,
            padding: '1px 5px',
            border: '1px solid rgba(191,78,50,0.28)',
            borderRadius: 1,
          }}
        >
          Demo
        </span>
      </div>

      <span style={{ fontSize: 12, fontWeight: 600, color: INK(0.62), letterSpacing: 0.2 }}>
        Stable Seer
      </span>

      <div style={{ marginLeft: 'auto', fontSize: 10, color: INK(0.34), letterSpacing: 0.3 }}>
        Read-only · Sample fixture data
      </div>
    </header>
  );
}
