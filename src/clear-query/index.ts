import { alias, tag, Tag } from '@storefront/core';

@alias('clearQuery')
@tag('gb-clear-query', require('./index.html'))
class ClearQuery {

  state: ClearQuery.State = {
    onClick: () => this.actions.resetQuery()
  };
}

interface ClearQuery extends Tag<any, ClearQuery.State> { }
namespace ClearQuery {
  export interface State {
    onClick(): void;
  }
}

export default ClearQuery;
