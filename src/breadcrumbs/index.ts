import { tag, Events, Selectors, Tag } from '@storefront/core';

@tag('gb-breadcrumbs', require('./index.html'), [
  { name: 'showLabels', default: true },
  {
    name: 'labels',
    default: {
      results: 'Results:',
      noResults: 'No Results:',
      corrected: 'Corrected:'
    }
  }
])
class Breadcrumbs {

  state: Breadcrumbs.State = {
    fields: []
  };

  init() {
    this.flux.on(Events.ORIGINAL_QUERY_UPDATED, this.updateOriginalQuery);
    this.flux.on(Events.CORRECTED_QUERY_UPDATED, this.updateCorrectedQuery);
    this.flux.on(Events.NAVIGATIONS_UPDATED, this.updateFields);
    this.flux.on(Events.SELECTED_REFINEMENTS_UPDATED, this.updateFields);
  }

  onBeforeMount() {
    this.state = {
      ...this.state,
      labels: this.props.labels,
      showLabels: this.props.showLabels
    };
    this.expose('breadcrumbs');
  }

  updateOriginalQuery = (originalQuery: string) =>
    this.set({ originalQuery })

  updateCorrectedQuery = (correctedQuery: string) =>
    this.set({ correctedQuery })

  updateFields = () => {
    const navigations = Selectors.navigations(this.flux.store.getState());
    this.set({
      fields: navigations.filter((navigation) => navigation.selected.length !== 0)
        .map((navigation) => navigation.field)
    });
  }
}

interface Breadcrumbs extends Tag<Breadcrumbs.Props, Breadcrumbs.State> { }
namespace Breadcrumbs {
  export interface Props {
    showLabels?: boolean;
    labels?: {
      results?: string;
      noResults?: string;
      corrected?: string;
    };
  }

  export interface State extends Props {
    originalQuery?: string;
    correctedQuery?: string;
    fields: string[];
  }
}

export default Breadcrumbs;
