import { provide, tag, Events, Selectors, Store, StoreSections, Tag } from '@storefront/core';

@provide('refinementCrumbs')
@tag('gb-refinement-crumbs', require('./index.html'))
class RefinementCrumbs {
  previousField: string;

  init() {
    let selectedRefinementsUpdated, navigationSelector;
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        selectedRefinementsUpdated = Events.PAST_PURCHASE_SELECTED_REFINEMENTS_UPDATED;
        navigationSelector = (field) => this.select(Selectors.pastPurchaseNavigation, field);
        break;
      case StoreSections.SEARCH:
        selectedRefinementsUpdated = Events.SELECTED_REFINEMENTS_UPDATED;
        navigationSelector = (field) => this.select(Selectors.navigation, field);
        break;
    }
    this.state = { ...this.state, selectedRefinementsUpdated, navigationSelector, ...this.selectRefinements(navigationSelector) };
    this.updateState();
  }

  onUpdate() {
    this.updateState();
  }

  onUnmount() {
    this.flux.off(`${this.state.selectedRefinementsUpdated}:${this.previousField}`, this.updateRefinements);
  }

  updateState() {
    this.flux.off(`${this.state.selectedRefinementsUpdated}:${this.previousField}`, this.updateRefinements);
    this.flux.on(`${this.state.selectedRefinementsUpdated}:${this.props.field}`, this.updateRefinements);
    this.previousField = this.props.field;
  }

  updateRefinements = () => this.set(this.selectRefinements(this.state.navigationSelector));

  selectRefinements(getNavigation: (field) => Store.Navigation) {
    const { field } = this.props;
    const navigation = getNavigation(field);

    if (navigation) {
      const { range, refinements, selected } = navigation;

      return {
        ...navigation,
        field,
        refinements: refinements
          .map((refinement, index) => ({
            ...refinement,
            index,
            field,
            range,
            selected: selected.includes(index),
          }))
          .filter((refinement) => refinement.selected),
      };
    }
  }
}

interface RefinementCrumbs extends Tag<RefinementCrumbs.Props, RefinementCrumbs.State> {}
namespace RefinementCrumbs {
  export interface Props extends Tag.Props {
    field: string;
  }

  export interface State extends Store.Navigation {
    navigationSelector?: (field: string) => Store.Navigation;
    refinements: Store.Refinement[];
    selectedRefinementsUpdated?: string;
  }
}

export default RefinementCrumbs;
