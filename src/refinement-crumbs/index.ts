import { alias, tag, Selectors, Store, Tag } from '@storefront/core';

@alias('refinementCrumbs')
@tag('gb-refinement-crumbs', require('./index.html'))
class RefinementCrumbs {

  state: RefinementCrumbs.State = {
    refinements: []
  };

  init() {
    const field = this.props.field;
    const navigation = Selectors.navigation(this.flux.store.getState(), field);
    this.state = {
      field,
      label: navigation.label,
      refinements: navigation.refinements
        .map((refinement, index) => ({
          ...refinement,
          index,
          field,
          selected: navigation.selected.includes(index),
          range: navigation.range
        }))
        .filter((refinement) => refinement.selected)
    };
  }
}

interface RefinementCrumbs extends Tag<RefinementCrumbs.Props, RefinementCrumbs.State> { }
namespace RefinementCrumbs {
  export interface Props {
    field: string;
  }

  export interface State {
    field?: string;
    label?: string;
    refinements: Store.Refinement[];
  }
}

export default RefinementCrumbs;
