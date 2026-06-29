import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StableSeer from '../src/StableSeer.jsx';
import fixture from '../src/data/stable-seer.fixture.json';

describe('Stable Seer', () => {
  it('renders the surface', () => {
    render(<StableSeer />);
    expect(screen.getByTestId('stable-seer')).toBeInTheDocument();
  });

  it('renders all fixture coins', () => {
    render(<StableSeer />);
    for (const coin of fixture.coins) {
      expect(screen.getByText(coin.symbol)).toBeInTheDocument();
    }
  });

  it('filters coins by search query', () => {
    render(<StableSeer />);
    const input = screen.getByLabelText('Search stablecoins');
    fireEvent.change(input, { target: { value: 'USDC' } });
    expect(screen.getByText('USDC')).toBeInTheDocument();
    expect(screen.queryByText('DAI')).not.toBeInTheDocument();
  });

  it('shows empty state for unmatched search', () => {
    render(<StableSeer />);
    const input = screen.getByLabelText('Search stablecoins');
    fireEvent.change(input, { target: { value: 'ZZZNOMATCH' } });
    expect(screen.getByText(/No results for/)).toBeInTheDocument();
  });

  it('shows coin detail on click', () => {
    render(<StableSeer />);
    fireEvent.click(screen.getByText('USDC'));
    expect(screen.getByTestId('coin-detail')).toBeInTheDocument();
  });

  it('shows disclaimer', () => {
    render(<StableSeer />);
    expect(screen.getByTestId('disclaimer')).toBeInTheDocument();
  });
});
