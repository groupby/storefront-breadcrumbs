import { tag, Tag } from '@storefront/core';

@tag('gb-clear-refinement', require('./index.html'))
class ClearRefinement {

  state: ClearRefinement.State = {
    onClick: () => {
      this.log.warn('hello dolly', this.props.field, this.props.index);
      this.flux.unrefine(this.props.field, this.props.index);
    }
  };

  init() {
    this.expose('clearRefinement');
  }
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
