import { alias, tag, Tag } from '@storefront/core';

@alias('clearRefinement')
@tag('gb-clear-refinement', require('./index.html'))
class ClearRefinement {

  state: ClearRefinement.State = {
    onClick: () => this.flux.unrefine(this.props.field, this.props.index)
  };
}

interface ClearRefinement extends Tag<ClearRefinement.Props, ClearRefinement.State> { }
namespace ClearRefinement {
  export interface Props {
    field: string;
    index: number;
  }

  export interface State {
    onClick(): void;
  }
}

export default ClearRefinement;
