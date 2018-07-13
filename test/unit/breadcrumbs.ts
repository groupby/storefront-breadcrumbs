import { Events, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import Breadcrumbs from '../../src/breadcrumbs';
import suite from './_suite';

const QUERY = 'ballroom shoes';
const CORRECTED_QUERY = 'giraffe';

suite('Breadcrumbs', ({ expect, spy, stub, itShouldBeConfigurable, itShouldProvideAlias }) => {
  let breadcrumbs: Breadcrumbs;
  let select: sinon.SinonStub;

  beforeEach(() => {
    select = Breadcrumbs.prototype.select = stub();
    select.withArgs(Selectors.query).returns(QUERY);
    select.withArgs(Selectors.currentQuery).returns(QUERY);
    Breadcrumbs.prototype.flux = <any>{};
    breadcrumbs = new Breadcrumbs();
  });
  afterEach(() => {
    delete Breadcrumbs.prototype.flux;
    delete Breadcrumbs.prototype.select;
  });

  itShouldBeConfigurable(Breadcrumbs);
  itShouldProvideAlias(Breadcrumbs, 'breadcrumbs');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(breadcrumbs.props).to.eql({
          showLabels: true,
          labels: {
            results: 'Results:',
            noResults: 'No Results:',
            corrected: 'Corrected:',
          },
        });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(select).to.be.calledWith(Selectors.query);
        expect(breadcrumbs.state).to.eql({
          fields: [],
          originalQuery: QUERY,
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for ORIGINAL_QUERY_UPDATED', () => {
      const subscribe = (breadcrumbs.subscribe = spy());
      breadcrumbs.updateOriginalQuery = () => null;

      breadcrumbs.init();

      expect(subscribe).to.be.calledWith(Events.ORIGINAL_QUERY_UPDATED, breadcrumbs.updateOriginalQuery);
    });

    it('should listen for CORRECTED_QUERY_UPDATED', () => {
      const subscribe = (breadcrumbs.subscribe = spy());
      breadcrumbs.updateOriginalQuery = () => null;

      breadcrumbs.init();

      expect(subscribe).to.be.calledWith(Events.CORRECTED_QUERY_UPDATED, breadcrumbs.updateCorrectedQuery);
    });

    it('should listen for NAVIGATIONS_UPDATED', () => {
      const subscribe = (breadcrumbs.subscribe = spy());
      breadcrumbs.updateOriginalQuery = () => null;

      breadcrumbs.init();

      expect(subscribe).to.be.calledWith(Events.NAVIGATIONS_UPDATED, breadcrumbs.updateFields);
    });
  });

  describe('onBeforeMount()', () => {
    it('should call updateCorrectedQuery', () => {
      breadcrumbs.updateOriginalQuery = spy();
      const updateCorrectedQuery = (breadcrumbs.updateCorrectedQuery = spy());
      select.withArgs(Selectors.currentQuery).returns(CORRECTED_QUERY);

      breadcrumbs.onBeforeMount();

      expect(updateCorrectedQuery).to.be.calledOnce;
    });
  });

  describe('updateOriginalQuery()', () => {
    it('should set originalQuery', () => {
      const originalQuery = 'panco';
      const set = (breadcrumbs.set = spy());

      breadcrumbs.updateOriginalQuery(originalQuery);

      expect(set).to.be.calledWith({ originalQuery });
    });
  });

  describe('updateCorrectedQuery()', () => {
    it('should set correctedQuery', () => {
      const correctedQuery = 'panko';
      const set = (breadcrumbs.set = spy());

      breadcrumbs.updateCorrectedQuery(correctedQuery);

      expect(set).to.be.calledWith({ correctedQuery });
    });
  });

  describe('updateFields()', () => {
    it('should set fields', () => {
      const fields = ['c', 'd'];
      const set = (breadcrumbs.set = spy());
      const getFields = (breadcrumbs.getFields = spy(() => fields));

      breadcrumbs.updateFields();

      expect(set).to.be.calledWith({ fields });
    });
  });

  describe('getFields()', () => {
    it('should get fields', () => {
      const state = { a: 'b' };
      const navigations = [{ selected: [1], field: 'c' }, { selected: [2, 3], field: 'd' }, { selected: [] }];
      select.returns(navigations);
      breadcrumbs.flux = <any>{ store: { getState: () => state } };

      const fields = breadcrumbs.getFields();

      expect(fields).to.be.eql(['c', 'd']);
      expect(select).to.be.calledWith(Selectors.navigations);
    });
  });
});
