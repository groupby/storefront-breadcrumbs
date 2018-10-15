import { tag, StoreSections, Tag } from '@storefront/core';

@tag('gb-clear-all-refinements', require('./index.html'))
class ClearAllRefinements {
  init() {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.state = { action: () => this.actions.resetPastPurchaseRefinements(true) };
        break;
      case StoreSections.SEARCH:
        this.state = { action: () => this.actions.resetRefinements(true) };
        break;
    }
  }

  onClick = () => this.state.action();
}

interface ClearAllRefinements extends Tag<ClearAllRefinements.Props, ClearAllRefinements.State> {}
namespace ClearAllRefinements {
  export interface Props extends Tag.Props {}

  export interface State {
    action(): void;
  }
}

export default ClearAllRefinements;
