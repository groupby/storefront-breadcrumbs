import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/breadcrumbs/index.html', {});
mock('../src/clear-query/index.html', {});
mock('../src/clear-refinement/index.html', {});
mock('../src/corrected-query/index.html', {});
mock('../src/original-query/index.html', {});
mock('../src/query-crumb/index.html', {});
mock('../src/refinement-crumb/index.html', {});
mock('../src/refinement-crumbs/index.html', {});
