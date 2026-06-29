export default function Disclaimer() {
  return (
    <aside
      data-testid="disclaimer"
      style={{
        background: 'rgba(201, 164, 122, 0.10)',
        border: '1px solid rgba(201, 164, 122, 0.30)',
        borderRadius: 2,
        padding: '10px 14px',
        fontSize: 11,
        color: 'rgba(30,26,20,0.62)',
        lineHeight: 1.5,
        marginBottom: 20,
      }}
    >
      <strong style={{ color: 'rgba(30,26,20,0.72)', letterSpacing: 0.4 }}>Demo data only.</strong>{' '}
      All values are synthetic fixture data. No wallet connection. No transactions. No custody.
      No signing. No paid Dune execution. Not financial advice. Not production quantum protection.
      Not audited vault safety. For real data, wire your own read-only source per{' '}
      <code style={{ fontSize: 10 }}>docs/DATA_FIXTURES.md</code>.
    </aside>
  );
}
