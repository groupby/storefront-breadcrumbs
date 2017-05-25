import { view, Component } from '@storefront/core';

@view('gb-clear-query', require('./index.html'))
class ClearQuery extends Component {

  state: ClearQuery.State = {
    onClick: () => this.flux.resetQuery()
  };

  constructor() {
    super();
    this.expose('clearQuery');
  }
}

namespace ClearQuery {
  export interface State {
    onClick(): void;
  }
}

export default ClearQuery;
