import { provide, tag, StoreSections, Tag, Store } from '@storefront/core';

@provide('clearRefinement')
@tag('gb-clear-refinement', require('./index.html'))
class ClearRefinement {
  state: ClearRefinement.State = {
    onClick: () => {
      switch (this.props.storeSection) {
        case StoreSections.PAST_PURCHASES:
          return this.actions.deselectPastPurchaseRefinement(this.props.field, this.props.index);
        case StoreSections.SEARCH:
          return this.actions.deselectRefinement(this.props.field, this.props.index);
      }
    }
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
