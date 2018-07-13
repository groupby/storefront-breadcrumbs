import { configurable, provide, tag, Events, Selectors, Tag } from '@storefront/core';

@configurable
@provide<Breadcrumbs.Props, Breadcrumbs.State>(
  'breadcrumbs',
  ({ showLabels, labels }, { fields, originalQuery, correctedQuery }) => ({
    showLabels,
    labels,
    fields,
    originalQuery,
    correctedQuery,
  })
)
@tag('gb-breadcrumbs', require('./index.html'))
class Breadcrumbs {
  props: Breadcrumbs.Props = {
    showLabels: true,
    labels: {
      results: 'Results:',
      noResults: 'No Results:',
      corrected: 'Corrected:',
    },
  };

  state: Breadcrumbs.State = {
    fields: this.getFields(),
    originalQuery: this.select(Selectors.query),
  };

  queryProps() {
    const { showLabels, labels } = this.props;
    const { originalQuery, correctedQuery } = this.state;
    return { showLabels, labels, originalQuery, correctedQuery };
  }

  init() {
    this.subscribe(Events.ORIGINAL_QUERY_UPDATED, this.updateOriginalQuery);
    this.subscribe(Events.CORRECTED_QUERY_UPDATED, this.updateCorrectedQuery);
    this.subscribe(Events.NAVIGATIONS_UPDATED, this.updateFields);
  }

  onBeforeMount() {
    // force update on before-mount, note that originalQuery is set in constructor
    const correctedQuery = this.select(Selectors.currentQuery);

    if (this.state.originalQuery !== correctedQuery) {
      this.updateCorrectedQuery(correctedQuery);
    }
  }

  updateOriginalQuery = (originalQuery: string) => this.set({ originalQuery });

  updateCorrectedQuery = (correctedQuery: string) => this.set({ correctedQuery });

  updateFields = () => this.set({ fields: this.getFields() });

  getFields() {
    return this.select(Selectors.navigations)
      .filter((navigation) => navigation.selected.length !== 0)
      .map((navigation) => navigation.field);
  }
}

interface Breadcrumbs extends Tag<Breadcrumbs.Props, Breadcrumbs.State> {}
namespace Breadcrumbs {
  export interface Props extends Tag.Props {
    showLabels?: boolean;
    labels?: {
      results?: string;
      noResults?: string;
      corrected?: string;
    };
  }

  export interface State {
    fields: string[];
    originalQuery: string;
    correctedQuery?: string;
  }
}

export default Breadcrumbs;
