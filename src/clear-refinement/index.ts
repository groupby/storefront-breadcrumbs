import { provide, tag, Tag } from '@storefront/core';

@provide('clearRefinement')
@tag('gb-clear-refinement', require('./index.html'))
class ClearRefinement {
  state: ClearRefinement.State = {
    onClick: () => this.actions.deselectRefinement(this.props.field, this.props.index),
  };
}

interface ClearRefinement extends Tag<ClearRefinement.Props, ClearRefinement.State> {}
namespace ClearRefinement {
  export interface Props extends Tag.Props {
    field: string;
    index: number;
  }

  export interface State {
    onClick(): void;
  }
}

export default ClearRefinement;
