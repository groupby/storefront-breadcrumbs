import ClearAllRefinements from '../../src/clear-all-refinements';
import suite from './_suite';
import { StoreSections } from '@storefront/core';

suite('ClearAllRefinements', ({ expect, spy, stub }) => {
  let clearAllRefinements: ClearAllRefinements;

  beforeEach(() => (clearAllRefinements = new ClearAllRefinements()));

  describe('init()', () => {
    beforeEach(() => {
      clearAllRefinements.state = <any>{};
      clearAllRefinements.actions = <any>{
        resetRefinements: spy(),
        resetPastPurchaseRefinements: spy(),
      };
    });

    it('should set state.action to actions.resetRefinements() if storeSection is search', () => {
      clearAllRefinements.props = { storeSection: StoreSections.SEARCH };
      const resetRefinements = (clearAllRefinements.actions.resetRefinements = spy());

      clearAllRefinements.init();
      clearAllRefinements.state.action();

      expect(resetRefinements).to.be.calledWithExactly(true);
    });

    it('should set state.action to actions.resetPastPurchaseRefinements() if storeSection is pastpurchases', () => {
      clearAllRefinements.props = { storeSection: StoreSections.PAST_PURCHASES };
      const resetPastPurchaseRefinements = (clearAllRefinements.actions.resetPastPurchaseRefinements = spy());

      clearAllRefinements.init();
      clearAllRefinements.state.action();

      expect(resetPastPurchaseRefinements).to.be.calledWithExactly(true);
    });
  });

  describe('onClick()', () => {
    it('should call state.action()', () => {
      clearAllRefinements.state = { action: spy() };

      clearAllRefinements.onClick();

      expect(clearAllRefinements.state.action).to.be.called;
    });
  });
});
