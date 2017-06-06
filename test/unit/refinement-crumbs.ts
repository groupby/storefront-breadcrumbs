import { Selectors } from '@storefront/core';
import RefinementCrumbs from '../../src/refinement-crumbs';
import suite from './_suite';

suite('RefinementCrumbs', ({ expect, stub }) => {
  let refinementCrumbs: RefinementCrumbs;

  beforeEach(() => refinementCrumbs = new RefinementCrumbs());

  describe('constructor()', () => {
    describe('state', () => {
      it('should have initial value', () => {
        expect(refinementCrumbs.state).to.eql({ refinements: [] });
      });
    });
  });

  describe('init()', () => {
    it('should update state', () => {
      const field = 'colour';
      const label = 'Colour';
      const range = true;
      const state = { a: 'b' };
      const navigation = {
        label,
        range,
        refinements: [{ a: 'b' }, { c: 'd' }, { e: 'f' }],
        selected: [0, 2]
      };
      const selectNavigation = stub(Selectors, 'navigation').returns(navigation);
      refinementCrumbs.props = { field };
      refinementCrumbs.flux = <any>{ store: { getState: () => state } };

      refinementCrumbs.init();

      expect(refinementCrumbs.state).to.eql({
        field,
        label,
        refinements: [
          { field, range, index: 0, selected: true, a: 'b' },
          { field, range, index: 2, selected: true, e: 'f' },
        ]
      });
      expect(selectNavigation).to.be.calledWith(state, field);
    });
  });
});
