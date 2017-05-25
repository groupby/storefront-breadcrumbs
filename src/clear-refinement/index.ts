import { view, Component } from '@storefront/core';

@view('gb-clear-refinement', require('./index.html'))
class ClearRefinement extends Component {
  props: ClearRefinement.Props;
  state: ClearRefinement.State = {
    onClick: () => {
      this.log.warn('hello dolly', this.props.field, this.props.index);
      this.flux.unrefine(this.props.field, this.props.index);
    }
  };

  constructor() {
    super();
    this.expose('clearRefinement');
  }
}

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
