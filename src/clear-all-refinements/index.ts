import { tag, StoreSections, Tag } from '@storefront/core';

@tag('gb-clear-all-refinements', require('./index.html'))
class ClearAllRefinements {
  onClick = () => {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        return this.actions.resetPastPurchaseRefinements(true);
      case StoreSections.SEARCH:
        return this.actions.resetRefinements(true);
    }
  }
}

interface ClearAllRefinements extends Tag {}

export default ClearAllRefinements;
