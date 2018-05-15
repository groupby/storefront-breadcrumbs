import { provide, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@provide('refinementCrumbs')
@tag('gb-refinement-crumbs', require('./index.html'))
class RefinementCrumbs {
  previousField: string;
  state: RefinementCrumbs.State = {
    refinements: [],
  };

  onBeforeMount() {
    this.updateState();
  }

  onUpdate() {
    this.updateState();
  }

  onUnmount() {
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.previousField}`, this.updateRefinements);
  }

  updateState() {
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.previousField}`, this.updateRefinements);
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.props.field}`, this.updateRefinements);
    this.previousField = this.props.field;
    this.state = this.selectRefinements();
  }

  updateRefinements = () => this.update({ state: this.selectRefinements() });

  selectRefinements() {
    const { field } = this.props;
    const navigation = this.select(Selectors.navigation, field);

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
    refinements: Store.Refinement[];
  }
}

export default RefinementCrumbs;
