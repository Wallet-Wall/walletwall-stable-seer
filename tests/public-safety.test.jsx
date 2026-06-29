import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App.jsx';
import Disclaimer from '../src/components/Disclaimer.jsx';

describe('Public safety: disclaimers present', () => {
  it('Disclaimer component renders demo data notice', () => {
    render(<Disclaimer />);
    const el = screen.getByTestId('disclaimer');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toMatch(/demo data only/i);
  });

  it('Disclaimer states no wallet connection', () => {
    render(<Disclaimer />);
    expect(screen.getByTestId('disclaimer').textContent).toMatch(/no wallet connection/i);
  });

  it('Disclaimer states no transactions', () => {
    render(<Disclaimer />);
    expect(screen.getByTestId('disclaimer').textContent).toMatch(/no transactions/i);
  });

  it('Disclaimer states no custody', () => {
    render(<Disclaimer />);
    expect(screen.getByTestId('disclaimer').textContent).toMatch(/no custody/i);
  });

  it('Disclaimer states no signing', () => {
    render(<Disclaimer />);
    expect(screen.getByTestId('disclaimer').textContent).toMatch(/no signing/i);
  });

  it('Disclaimer states no paid Dune execution', () => {
    render(<Disclaimer />);
    expect(screen.getByTestId('disclaimer').textContent).toMatch(/no paid dune execution/i);
  });

  it('App renders and shows read-only indicator', () => {
    render(<App />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(screen.getAllByText(/read-only/i).length).toBeGreaterThanOrEqual(1);
  });

  it('no visible text advertises signing, swapping, or live execution', () => {
    render(<App />);
    const body = document.body.textContent.toLowerCase();
    expect(body).not.toMatch(/sign transaction/);
    expect(body).not.toMatch(/connect wallet/);
    expect(body).not.toMatch(/deposit funds/);
    expect(body).not.toMatch(/swap tokens/);
    expect(body).not.toMatch(/yield execution/);
    expect(body).not.toMatch(/live execution/);
  });
});
