import ClearRefinement from '../../src/clear-refinement';
import suite from './_suite';

suite('ClearRefinement', ({ expect, spy }) => {
  let clearRefinement: ClearRefinement;

  beforeEach(() => clearRefinement = new ClearRefinement());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should call flux.resetRefinement()', () => {
          const field = 'brand';
          const index = 13;
          const unrefine = spy();
          clearRefinement.props = { field, index };
          clearRefinement.flux = <any>{ unrefine };

          clearRefinement.state.onClick();

          expect(unrefine).to.be.calledWith(field, index);
        });
      });
    });
  });
});
