import { provide, tag, Events, Selectors, Store, StoreSections, Tag } from '@storefront/core';

@provide('refinementCrumbs')
@tag('gb-refinement-crumbs', require('./index.html'))
class RefinementCrumbs {
  previousField: string;
  state: RefinementCrumbs.State = {
    refinements: [],
  };

  init() {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.state.selectedRefinementsUpdated = Events.PAST_PURCHASE_SELECTED_REFINEMENTS_UPDATED;
        this.state.navigationSelector = (field) => this.select(Selectors.pastPurchaseNavigation, field);
        break;
      case StoreSections.SEARCH:
        this.state.selectedRefinementsUpdated = Events.SELECTED_REFINEMENTS_UPDATED;
        this.state.navigationSelector = (field) => this.select(Selectors.navigation, field);
        break;
    }
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
    this.state = { ...this.state, ...this.selectRefinements() };
  }

  updateRefinements = () => this.set(this.selectRefinements());

  selectRefinements() {
    const { field } = this.props;
    const navigation = this.state.navigationSelector(field);

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

  export interface State {
    label?: string;
    navigationSelector?: (field: string) => any;
    refinements: Store.Refinement[];
    selectedRefinementsUpdated?: string;
  }
}

export default RefinementCrumbs;
