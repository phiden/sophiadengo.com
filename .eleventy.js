const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Returns work items, sorted by display order
  config.addCollection('work', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
  });

  // Returns work items, sorted by display order then filtered by featured
  config.addCollection('featuredWork', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
      x => x.data.featured
    );
  });

  // Returns work items, sorted by display order then filtered by freelance => does it work?
  config.addCollection('freelance', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
      x => x.data.freelance
    );
  });

  // Returns work items, sorted by display order then filtered by featured => does it work?
  config.addCollection('sidework', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
      x => x.data.sidework
    );
  });

  // Returns work items, sorted by display order then filtered by featured => does it work?
  config.addCollection('designSystem', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
      x => x.data.designSystem
    );
  });

  // Returns a list of resume items ordered by filename
  config.addCollection('resume', collection => {
    return collection.getFilteredByGlob('./src/resume/*.md').sort((a, b) => {
      return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    });
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
