import React from 'react';
import { waitFor } from '@testing-library/react-native';
import { render } from '@test-utils/render';
import SectorTrainingScreen from './SectorTrainingScreen';

describe('SectorTrainingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', async () => {
      const { toJSON } = render(<SectorTrainingScreen mode="random" />);
      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });

    it('renders with different sector modes', async () => {
      const sectors = ['voisins', 'tier', 'orphelins', 'zero', 'random'];
      for (const sector of sectors) {
        const { toJSON } = render(
          <SectorTrainingScreen
            mode={sector as 'voisins' | 'tier' | 'orphelins' | 'zero' | 'random'}
          />
        );
        await waitFor(() => {
          expect(toJSON()).toBeTruthy();
        });
      }
    });
  });

  describe('Mode Handling', () => {
    it('handles voisins mode', async () => {
      const { toJSON } = render(<SectorTrainingScreen mode="voisins" />);
      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });

    it('handles tier mode', async () => {
      const { toJSON } = render(<SectorTrainingScreen mode="tier" />);
      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });

    it('handles orphelins mode', async () => {
      const { toJSON } = render(<SectorTrainingScreen mode="orphelins" />);
      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });

    it('handles zero mode', async () => {
      const { toJSON } = render(<SectorTrainingScreen mode="zero" />);
      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });

    it('uses random mode as default if not provided', async () => {
      const { toJSON } = render(<SectorTrainingScreen />);
      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });
    });
  });

  describe('HUD Elements', () => {
    it('displays score section', async () => {
      const { getByText } = render(<SectorTrainingScreen mode="random" />);
      await waitFor(() => {
        expect(getByText(/0\//)).toBeTruthy(); // Score starts as 0/0
      });
    });
  });
});
