import ClearAllRefinements from '../../src/clear-all-refinements';
import suite from './_suite';

suite('ClearAllRefinements', ({ expect, spy, itShouldHaveAlias }) => {
  let clearAllRefinements: ClearAllRefinements;

  itShouldHaveAlias(ClearAllRefinements, 'clearAllRefinements');

  beforeEach(() => clearAllRefinements = new ClearAllRefinements());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should call actions.resetRefinements()', () => {
          const resetRefinements = spy();
          clearAllRefinements.actions = <any>{ resetRefinements };

          clearAllRefinements.state.onClick();

          expect(resetRefinements).to.be.called;
        });
      });
    });
  });
});
