import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('refinementCrumbs')
@tag('gb-refinement-crumbs', require('./index.html'))
class RefinementCrumbs {

  field: string;
  state: RefinementCrumbs.State = {
    refinements: []
  };

  init() {
    this.updateField(this.props.field);
    this.updateRefinements();
  }

  onUpdate() {
    if (this.props.field !== this.field) {
      this.updateField(this.props.field);
      this.state = this.selectRefinements();
      this.updateAlias('refinementCrumbs', this.state);
    }
  }

  updateField(field: string) {
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.field}`, this.updateRefinements);
    this.field = field;
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, this.updateRefinements);
  }

  updateRefinements = () => this.update({ state: this.selectRefinements() });

  selectRefinements() {
    const field = this.field;
    const navigation = Selectors.navigation(this.flux.store.getState(), field);
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
          .filter((refinement) => refinement.selected)
      };
    }
  }
}

interface RefinementCrumbs extends Tag<RefinementCrumbs.Props, RefinementCrumbs.State> { }
namespace RefinementCrumbs {
  export interface Props {
    field: string;
  }

  export interface State {
    label?: string;
    refinements: Store.Refinement[];
  }
}

export default RefinementCrumbs;
