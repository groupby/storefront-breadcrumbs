import { alias, tag, Tag } from '@storefront/core';

@alias('clearAllRefinements')
@tag('gb-clear-all-refinements', require('./index.html'))
class ClearAllRefinements {

  state: ClearAllRefinements.State = {
    onClick: () => this.actions.resetRefinements()
  };
}

interface ClearAllRefinements extends Tag<any, ClearAllRefinements.State> { }
namespace ClearAllRefinements {
  export interface State {
    onClick(): void;
  }
}

export default ClearAllRefinements;
