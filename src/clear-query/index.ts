import { tag, Tag } from '@storefront/core';

@tag('gb-clear-query', require('./index.html'))
class ClearQuery {

  state: ClearQuery.State = {
    onClick: () => this.flux.resetQuery()
  };

  init() {
    this.expose('clearQuery');
  }
}

interface ClearQuery extends Tag<any, ClearQuery.State> { }
namespace ClearQuery {
  export interface State {
    onClick(): void;
  }
}

export default ClearQuery;
