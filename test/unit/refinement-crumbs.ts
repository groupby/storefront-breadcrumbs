import { Events, Selectors } from '@storefront/core';
import RefinementCrumbs from '../../src/refinement-crumbs';
import suite from './_suite';

suite('RefinementCrumbs', ({ expect, spy, stub }) => {
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
    it('should call updateField()', () => {
      const field = 'material';
      const updateField = refinementCrumbs.updateField = spy();
      refinementCrumbs.updateRefinements = () => null;
      refinementCrumbs.props = { field };

      refinementCrumbs.init();

      expect(updateField).to.be.calledWith(field);
    });

    it('should call updateRefinements()', () => {
      const updateRefinements = refinementCrumbs.updateRefinements = spy();
      refinementCrumbs.updateField = () => null;
      refinementCrumbs.props = <any>{};

      refinementCrumbs.init();

      expect(updateRefinements).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateField()', () => {
      const field = 'material';
      const updateField = refinementCrumbs.updateField = spy();
      refinementCrumbs.selectRefinements = () => null;
      refinementCrumbs.updateAlias = () => null;
      refinementCrumbs.props = { field };

      refinementCrumbs.onUpdate();

      expect(updateField).to.be.calledWith(field);
    });

    it('should update the state', () => {
      const newState: any = { a: 'b' };
      refinementCrumbs.updateField = () => null;
      refinementCrumbs.selectRefinements = () => newState;
      refinementCrumbs.updateAlias = () => null;
      refinementCrumbs.props = <any>{ field: 'material' };
      refinementCrumbs.state = <any>{};

      refinementCrumbs.onUpdate();

      expect(refinementCrumbs.state).to.eq(newState);
    });

    it('should call updateAlias()', () => {
      const newState: any = { a: 'b' };
      const updateAlias = refinementCrumbs.updateAlias = spy();
      refinementCrumbs.updateField = () => null;
      refinementCrumbs.selectRefinements = () => newState;
      refinementCrumbs.props = <any>{ field: 'material' };
      refinementCrumbs.state = <any>{};

      refinementCrumbs.onUpdate();

      expect(updateAlias).to.be.calledWith('refinementCrumbs', newState);
    });
  });

  describe('updateField()', () => {
    it('should update field', () => {
      const field = 'material';
      refinementCrumbs.field = 'brand';
      refinementCrumbs.flux = <any>{ off: () => null, on: () => null };

      refinementCrumbs.updateField(field);

      expect(refinementCrumbs.field).to.eq(field);
    });

    it('should remove old listener', () => {
      const field = refinementCrumbs.field = 'brand';
      const off = spy();
      refinementCrumbs.flux = <any>{ off, on: () => null };

      refinementCrumbs.updateField('material');

      expect(off).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`);
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const field = 'material';
      const on = spy();
      refinementCrumbs.field = 'brand';
      refinementCrumbs.flux = <any>{ on, off: () => null };

      refinementCrumbs.updateField('material');

      expect(on).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`);
    });
  });

  describe('updateRefinements()', () => {
    it('should update state', () => {
      const newState: any = { a: 'b' };
      const update = refinementCrumbs.update = spy();
      refinementCrumbs.selectRefinements = () => newState;

      refinementCrumbs.updateRefinements();

      expect(update).to.be.calledWith({ state: newState });
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
      const field = refinementCrumbs.field = 'colour';
      const selectNavigation = stub(Selectors, 'navigation').returns(navigation);
      refinementCrumbs.flux = <any>{ store: { getState: () => state } };

      const refinements = refinementCrumbs.selectRefinements();

      expect(refinements).to.eql({
        a: 'b',
        field,
        range,
        selected,
        refinements: [
          { field, range, index: 0, selected: true, a: 'b' },
          { field, range, index: 2, selected: true, e: 'f' },
        ]
      });
      expect(selectNavigation).to.be.calledWith(state, field);
    });
  });
});
