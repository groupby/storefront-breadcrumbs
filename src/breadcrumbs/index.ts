import { alias, tag, Events, Selectors, Tag } from '@storefront/core';

@alias('breadcrumbs')
@tag('gb-breadcrumbs', require('./index.html'))
class Breadcrumbs {

  props: Breadcrumbs.Props = {
    showLabels: true,
    labels: {
      results: 'Results:',
      noResults: 'No Results:',
      corrected: 'Corrected:'
    }
  };
  state: Breadcrumbs.State = {
    fields: []
  };

  init() {
    this.state = {
      ...this.state,
      labels: this.props.labels,
      showLabels: this.props.showLabels
    };
    this.flux.on(Events.ORIGINAL_QUERY_UPDATED, this.updateOriginalQuery);
    this.flux.on(Events.CORRECTED_QUERY_UPDATED, this.updateCorrectedQuery);
    this.flux.on(Events.NAVIGATIONS_UPDATED, this.updateFields);
    this.flux.on(Events.SELECTED_REFINEMENTS_UPDATED, this.updateFields);
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
