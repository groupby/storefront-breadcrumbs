import { tag, Tag } from '@storefront/core';

@tag('gb-clear-all-refinements', require('./index.html'))
class ClearAllRefinements {

  onClick = () => this.actions.resetRefinements();
}

interface ClearAllRefinements extends Tag { }

export default ClearAllRefinements;
