import { useState, useMemo } from 'react';
import fixture from './data/stable-seer.fixture.json';
import Disclaimer from './components/Disclaimer.jsx';
import { classifyPegStatus } from './lib/peg-status.js';
import './StableSeer.css';

// Peg status is derived from peg_deviation_pct + is_soft_peg rather than trusted
// blindly off the fixture's peg_status field, so the two can never quietly drift
// out of sync (see docs/DATA_FIXTURES.md for the soft-peg tolerance concept).
function getEffectivePegStatus(coin) {
  return classifyPegStatus(coin.peg_deviation_pct, Boolean(coin.is_soft_peg));
}

function getPegMeta(status, isSoftPeg) {
  switch (status) {
    case 'ok':    return { label: isSoftPeg ? 'Soft Peg OK' : 'On Peg', cls: 'ww-badge--safe', dot: '#22C55E' };
    case 'watch': return { label: 'Watch',  cls: 'ww-badge--warn', dot: '#C9A47A' };
    case 'alert': return { label: 'Depeg',  cls: 'ww-badge--risk', dot: '#BF4E32' };
    default:      return { label: 'On Peg', cls: 'ww-badge--safe', dot: '#22C55E' };
  }
}

function fmtLiquidity(v) {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v}`;
}

function CoinRow({ coin, isSelected, onSelect }) {
  const meta = getPegMeta(getEffectivePegStatus(coin), coin.is_soft_peg);
  return (
    <button
      className={`ss-coin-row${isSelected ? ' ss-coin-row--selected' : ''}`}
      onClick={() => onSelect(coin)}
      aria-pressed={isSelected}
    >
      <div className="ss-coin-row__symbol">{coin.symbol}</div>
      <div className="ss-coin-row__name">{coin.name}</div>
      <div className="ss-coin-row__mid">
        <span className={`ww-badge ${meta.cls}`}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.dot, display: 'inline-block' }} />
          {meta.label}
        </span>
        <span className="ss-coin-row__dev">
          ±{coin.peg_deviation_pct.toFixed(2)}%
        </span>
      </div>
      <div className="ss-coin-row__liq">{fmtLiquidity(coin.liquidity_usd)}</div>
    </button>
  );
}

function CoinDetail({ coin, onClose }) {
  if (!coin) return null;
  const meta = getPegMeta(getEffectivePegStatus(coin), coin.is_soft_peg);

  return (
    <div className="ss-detail" data-testid="coin-detail">
      <div className="ss-detail__header">
        <div>
          <div className="ww-label" style={{ marginBottom: 4 }}>Stable Seer — Detail</div>
          <div className="ss-detail__title">{coin.symbol}</div>
          <div className="ss-detail__subtitle">{coin.name}</div>
        </div>
        <button className="ss-detail__close" onClick={onClose} aria-label="Close detail">✕</button>
      </div>

      <div className="ss-detail__kpis">
        <div className="ss-kpi">
          <div className="ss-kpi__label">Peg Status</div>
          <span className={`ww-badge ${meta.cls}`}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.dot, display: 'inline-block' }} />
            {meta.label}
          </span>
        </div>
        <div className="ss-kpi">
          <div className="ss-kpi__label">Peg Price</div>
          <div className="ss-kpi__value">${coin.peg_price_usd.toFixed(4)}</div>
        </div>
        <div className="ss-kpi">
          <div className="ss-kpi__label">Deviation</div>
          <div className="ss-kpi__value">±{coin.peg_deviation_pct.toFixed(2)}%</div>
        </div>
        <div className="ss-kpi">
          <div className="ss-kpi__label">Total Liquidity</div>
          <div className="ss-kpi__value">{fmtLiquidity(coin.liquidity_usd)}</div>
        </div>
      </div>

      {coin.is_soft_peg && (
        <p className="ss-soft-peg-note">
          Soft-pegged: this demo treats algorithmic / partially-collateralized stablecoins as
          normally trading in a wider band around $1.00, so this snapshot's deviation reads as
          on-peg rather than a watch. See <code>docs/DATA_FIXTURES.md</code> for the simplified
          concept this demo uses — it is not a live depeg risk signal.
        </p>
      )}

      <div className="ww-label" style={{ marginTop: 20, marginBottom: 10 }}>Chains</div>
      <div className="ss-detail__chains">
        {coin.chains.map((c) => (
          <span key={c} className="ss-chip">{c}</span>
        ))}
      </div>

      <div className="ww-label" style={{ marginTop: 20, marginBottom: 10 }}>
        Pools ({coin.pools.length})
      </div>
      {coin.pools.map((pool) => (
        <div key={pool.id} className="ss-pool-row">
          <div className="ss-pool-row__name">{pool.name}</div>
          <div className="ss-pool-row__meta">
            <span className="ss-chip">{pool.dex}</span>
            <span className="ss-chip ss-chip--type">{pool.type}</span>
            <span className="ss-pool-row__liq">{fmtLiquidity(pool.liquidity_usd)}</span>
          </div>
        </div>
      ))}

      <div className="ss-detail__issuer">
        <span className="ss-detail__issuer-label">Issuer (demo)</span>
        {coin.issuer}
      </div>
    </div>
  );
}

export default function StableSeer() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fixture.coins;
    return fixture.coins.filter(
      (c) =>
        c.symbol.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="ss-root" data-testid="stable-seer">
      <div className="ss-left">
        <div className="ss-left__inner">
          <div className="ww-label" style={{ marginBottom: 12 }}>Stable Seer</div>
          <h1 className="ss-heading">Stablecoin Peg Monitor</h1>
          <p className="ss-subheading">
            Read-only peg deviation, pool classification, and liquidity — demo fixture data only.
          </p>

          <Disclaimer />

          <div className="ss-search-wrap">
            <input
              className="ss-search"
              type="search"
              placeholder="Search stablecoins... (USDC, DAI, FRAX…)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search stablecoins"
            />
          </div>

          <div className="ss-list-header">
            <span>Token</span>
            <span style={{ marginLeft: 'auto' }}>Peg</span>
            <span>Liquidity</span>
          </div>

          <div className="ss-list" role="list" aria-label="Stablecoin results">
            {filtered.length === 0 && (
              <div className="ss-empty">No results for &ldquo;{query}&rdquo;</div>
            )}
            {filtered.map((coin) => (
              <CoinRow
                key={coin.id}
                coin={coin}
                isSelected={selected?.id === coin.id}
                onSelect={(c) => setSelected(selected?.id === c.id ? null : c)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="ss-right">
        {selected ? (
          <CoinDetail coin={selected} onClose={() => setSelected(null)} />
        ) : (
          <div className="ss-empty-detail">
            <div className="ww-label" style={{ marginBottom: 8 }}>Select a stablecoin</div>
            <p style={{ color: 'rgba(30,26,20,0.45)', fontSize: 13 }}>
              Choose a stablecoin from the list to see peg detail, pool breakdown, and chain coverage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
