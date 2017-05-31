import { tag, Selectors, Store, Tag } from '@storefront/core';

@tag('gb-refinement-crumbs', require('./index.html'))
class RefinementCrumbs {

  state: RefinementCrumbs.State = {
    refinements: []
  };

  onBeforeMount() {
    const navigation = Selectors.navigation(this.flux.store.getState(), this.props.field);
    this.state = {
      field: this.props.field,
      label: navigation.label,
      refinements: navigation.refinements
        .map((refinement, index) => ({
          ...refinement,
          index,
          field: this.props.field,
          selected: navigation.selected.includes(index),
          range: navigation.range
        }))
        .filter((refinement) => refinement.selected)
    };
    this.expose('refinementCrumbs');
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
