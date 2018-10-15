import ClearAllRefinements from '../../src/clear-all-refinements';
import suite from './_suite';
import { StoreSections } from '@storefront/core';

suite('ClearAllRefinements', ({ expect, spy }) => {
  let clearAllRefinements: ClearAllRefinements;

  beforeEach(() => (clearAllRefinements = new ClearAllRefinements()));

  describe('onClick()', () => {
    it('should call actions.resetRefinements() if storeSection is search', () => {
      const resetRefinements = spy();
      clearAllRefinements.props = { storeSection: StoreSections.SEARCH };
      clearAllRefinements.actions = <any>{ resetRefinements };

      clearAllRefinements.onClick();

      expect(resetRefinements).to.be.calledWithExactly(true);
    });

    it('should call actions.resetPastPurchaseRefinements() if storeSection is pastpurchases', () => {
      const resetPastPurchaseRefinements = spy();
      clearAllRefinements.props = { storeSection: StoreSections.PAST_PURCHASES };
      clearAllRefinements.actions = <any>{ resetPastPurchaseRefinements };

      clearAllRefinements.onClick();

      expect(resetPastPurchaseRefinements).to.be.calledWithExactly(true);
    });
  });
});
