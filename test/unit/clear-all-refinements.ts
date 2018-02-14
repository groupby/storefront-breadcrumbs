import ClearAllRefinements from '../../src/clear-all-refinements';
import suite from './_suite';

suite('ClearAllRefinements', ({ expect, spy }) => {
  let clearAllRefinements: ClearAllRefinements;

  beforeEach(() => clearAllRefinements = new ClearAllRefinements());

  describe('onClick()', () => {
    it('should call actions.resetRefinements()', () => {
      const resetRefinements = spy();
      clearAllRefinements.actions = <any>{ resetRefinements };

      clearAllRefinements.onClick();

      expect(resetRefinements).to.be.calledWithExactly(true);
    });
  });
});
