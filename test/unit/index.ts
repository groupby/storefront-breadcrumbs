import * as pkg from '../../src';
import Breadcrumbs from '../../src/breadcrumbs';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Breadcrumbs', () => {
    expect(pkg.Breadcrumbs).to.eq(Breadcrumbs);
  });
});
