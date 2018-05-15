import ClearRefinement from '../../src/clear-refinement';
import suite from './_suite';

suite('ClearRefinement', ({ expect, spy, itShouldProvideAlias }) => {
  let clearRefinement: ClearRefinement;

  beforeEach(() => (clearRefinement = new ClearRefinement()));

  itShouldProvideAlias(ClearRefinement, 'clearRefinement');

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should call actions.deselectRefinement()', () => {
          const field = 'brand';
          const index = 13;
          const deselectRefinement = spy();
          clearRefinement.props = { field, index };
          clearRefinement.actions = <any>{ deselectRefinement };

          clearRefinement.state.onClick();

          expect(deselectRefinement).to.be.calledWith(field, index);
        });
      });
    });
  });
});
