const { page, app } = document.getElementById('docs-start').dataset;
try {
  // A failed first route would replace an already readable article with a 404.
  // Only start the router once its initial module can be evaluated.
  await import('./' + page);
  await import('./' + app);
} catch (error) {
  console.warn('Showing static documentation.', error);
}
