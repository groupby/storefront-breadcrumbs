import { Events, Selectors } from '@storefront/core';
import Breadcrumbs from '../../src/breadcrumbs';
import suite from './_suite';

suite('Breadcrumbs', ({ expect, spy, stub }) => {
  let breadcrumbs: Breadcrumbs;

  beforeEach(() => breadcrumbs = new Breadcrumbs());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(breadcrumbs.props).to.eql({
          showLabels: true,
          labels: {
            results: 'Results:',
            noResults: 'No Results:',
            corrected: 'Corrected:'
          }
        });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(breadcrumbs.state).to.eql({ fields: [] });
      });
    });
  });

  describe('init()', () => {
    it('should update state with labels', () => {
      const labels = { a: 'b' };
      const showLabels = false;
      breadcrumbs.flux = <any>{ on: () => null };
      breadcrumbs.props = { labels, showLabels };

      breadcrumbs.init();

      expect(breadcrumbs.state.showLabels).to.eq(showLabels);
      expect(breadcrumbs.state.labels).to.eq(labels);
    });

    it('should listen for ORIGINAL_QUERY_UPDATED', () => {
      const on = spy();
      breadcrumbs.flux = <any>{ on };

      breadcrumbs.init();

      expect(on).to.be.calledWith(Events.ORIGINAL_QUERY_UPDATED, breadcrumbs.updateOriginalQuery);
    });

    it('should listen for CORRECTED_QUERY_UPDATED', () => {
      const on = spy();
      breadcrumbs.flux = <any>{ on };

      breadcrumbs.init();

      expect(on).to.be.calledWith(Events.CORRECTED_QUERY_UPDATED, breadcrumbs.updateCorrectedQuery);
    });

    it('should listen for NAVIGATIONS_UPDATED', () => {
      const on = spy();
      breadcrumbs.flux = <any>{ on };

      breadcrumbs.init();

      expect(on).to.be.calledWith(Events.NAVIGATIONS_UPDATED, breadcrumbs.updateFields);
    });
  });

  describe('updateOriginalQuery()', () => {
    it('should set originalQuery', () => {
      const originalQuery = 'panco';
      const set = breadcrumbs.set = spy();

      breadcrumbs.updateOriginalQuery(originalQuery);

      expect(set).to.be.calledWith({ originalQuery });
    });
  });

  describe('updateCorrectedQuery()', () => {
    it('should set correctedQuery', () => {
      const correctedQuery = 'panko';
      const set = breadcrumbs.set = spy();

      breadcrumbs.updateCorrectedQuery(correctedQuery);

      expect(set).to.be.calledWith({ correctedQuery });
    });
  });

  describe('updateFields()', () => {
    it('should set fields', () => {
      const state = { a: 'b' };
      const navigations = [{ selected: [1], field: 'c' }, { selected: [2, 3], field: 'd' }, { selected: [] }];
      const selectNavigations = stub(Selectors, 'navigations').returns(navigations);
      const set = breadcrumbs.set = spy();
      breadcrumbs.flux = <any>{ store: { getState: () => state } };

      breadcrumbs.updateFields();

      expect(set).to.be.calledWith({ fields: ['c', 'd'] });
      expect(selectNavigations).to.be.calledWith(state);
    });
  });
});
