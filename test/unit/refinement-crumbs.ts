import { Events, Selectors } from '@storefront/core';
import RefinementCrumbs from '../../src/refinement-crumbs';
import suite from './_suite';

suite('RefinementCrumbs', ({ expect, spy, stub, itShouldProvideAlias }) => {
  let refinementCrumbs: RefinementCrumbs;

  beforeEach(() => (refinementCrumbs = new RefinementCrumbs()));

  itShouldProvideAlias(RefinementCrumbs, 'refinementCrumbs');

  describe('constructor()', () => {
    describe('state', () => {
      it('should have initial value', () => {
        expect(refinementCrumbs.state).to.eql({ refinements: [] });
      });
    });
  });

  describe('onBeforeMount()', () => {
    it('should call updateState()', () => {
      const updateState = (refinementCrumbs.updateState = spy());

      refinementCrumbs.onBeforeMount();

      expect(updateState).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateState()', () => {
      const updateState = (refinementCrumbs.updateState = spy());

      refinementCrumbs.onUpdate();

      expect(updateState).to.be.called;
    });
  });

  describe('updateState()', () => {
    it('should update field', () => {
      const field = 'material';
      refinementCrumbs.props = { field };
      refinementCrumbs.previousField = 'brand';
      refinementCrumbs.flux = { off: () => null, on: () => null } as any;
      refinementCrumbs.selectRefinements = () => null;

      refinementCrumbs.updateState();

      expect(refinementCrumbs.previousField).to.eq(field);
    });

    it('should remove old listener', () => {
      const off = spy();
      const previousField = (refinementCrumbs.previousField = refinementCrumbs.previousField = 'brand');
      refinementCrumbs.props = { field: 'material' };
      refinementCrumbs.flux = { off, on: () => null } as any;
      refinementCrumbs.selectRefinements = () => null;

      refinementCrumbs.updateState();

      expect(off).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${previousField}`);
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const field = 'material';
      const on = spy();
      refinementCrumbs.props = { field };
      refinementCrumbs.previousField = 'brand';
      refinementCrumbs.flux = { on, off: () => null } as any;
      refinementCrumbs.selectRefinements = () => null;

      refinementCrumbs.updateState();

      expect(on).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`);
    });
  });

  describe('updateRefinements()', () => {
    it('should update state', () => {
      const newState: any = { a: 'b' };
      const set = (refinementCrumbs.set = spy());
      refinementCrumbs.selectRefinements = () => newState;

      refinementCrumbs.updateRefinements();

      expect(set).to.be.calledWith(newState);
    });
  });

  describe('selectRefinements()', () => {
    it('should return build navigation state', () => {
      const label = 'Colour';
      const range = true;
      const state = { a: 'b' };
      const selected = [0, 2];
      const navigation = {
        a: 'b',
        range,
        selected,
        refinements: [{ a: 'b' }, { c: 'd' }, { e: 'f' }],
      };
      const field = 'colour';
      const select = (refinementCrumbs.select = spy(() => navigation));
      refinementCrumbs.props = { field };
      refinementCrumbs.flux = { store: { getState: () => state } } as any;

      const refinements = refinementCrumbs.selectRefinements();

      expect(refinements).to.eql({
        a: 'b',
        field,
        range,
        selected,
        refinements: [
          { field, range, index: 0, selected: true, a: 'b' },
          { field, range, index: 2, selected: true, e: 'f' },
        ],
      });
      expect(select).to.be.calledWith(Selectors.navigation, field);
    });

    it('should return undefined if navigation is undefined', () => {
      const field = 'hat';
      const select = (refinementCrumbs.select = spy());
      const state = { a: 'b' };
      refinementCrumbs.props = { field };
      refinementCrumbs.flux = { store: { getState: () => state } } as any;

      const refinements = refinementCrumbs.selectRefinements();

      expect(refinements).to.be.undefined;
      expect(select).to.be.calledWith(Selectors.navigation, field);
    });
  });
});
