import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import RegulationsTable from '@/components/RegulationsTable';
import { renderWithIntl } from '../renderWithIntl';

describe('RegulationsTable', () => {
  it('renders the three column headers', () => {
    renderWithIntl(<RegulationsTable />);
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('Who')).toBeInTheDocument();
    expect(screen.getByText('Process')).toBeInTheDocument();
  });

  it('renders all three capacity-threshold rows', () => {
    renderWithIntl(<RegulationsTable />);
    expect(screen.getByText('Under 100 kW')).toBeInTheDocument();
    expect(screen.getByRole('table').querySelectorAll('tbody tr')).toHaveLength(3);
  });
});
