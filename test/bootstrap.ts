import * as storefront from '@storefront/core';
import * as mock from 'mock-require';
import * as sinon from 'sinon';

sinon.stub(storefront, 'view');

mock('../src/breadcrumbs/index.html', {});
mock('../src/breadcrumbs/index.css', {});
