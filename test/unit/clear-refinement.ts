import { StoreSections } from '@storefront/core';
import ClearRefinement from '../../src/clear-refinement';
import suite from './_suite';

suite('ClearRefinement', ({ expect, spy, itShouldProvideAlias }) => {
  let clearRefinement: ClearRefinement;

  beforeEach(() => (clearRefinement = new ClearRefinement()));

  itShouldProvideAlias(ClearRefinement, 'clearRefinement');

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        let field, index;

        beforeEach(() => {
          field = 'brand';
          index = 13;
          clearRefinement.props = { field, index };
        });

        it('should call actions.deselectRefinement() if storeSection is search', () => {
          const deselectRefinement = spy();
          clearRefinement.props.storeSection = StoreSections.SEARCH;
          clearRefinement.actions  = <any>{ deselectRefinement };

          clearRefinement.state.onClick();

          expect(deselectRefinement).to.be.calledWith(field, index);
        });

        it('should call actions.deselectPastPurchaseRefinement() if storeSection is pastpurchases', () => {
          const deselectPastPurchaseRefinement = spy();
          clearRefinement.props.storeSection = StoreSections.PAST_PURCHASES;
          clearRefinement.actions = <any>{ deselectPastPurchaseRefinement };

          clearRefinement.state.onClick();

          expect(deselectPastPurchaseRefinement).to.be.calledWith(field, index);
        });
      });
    });
  });
});
