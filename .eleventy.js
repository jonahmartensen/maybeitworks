module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add('README.md');
  eleventyConfig.addGlobalData('projectLabels', {
    alba: 'ROSA ALBA',
    crycry: 'DR. CRY CRY',
    exercises: 'EXERCISES ON FORBIDDEN IMAGERY',
    freund: 'FREUND',
    horizont: 'HORIZONT, DA SITZT EIN KOLKRABE UND',
    keller: 'KELLER',
    never: 'NEVER NEVER LAND',
    rubea: 'ROSA RUBEA',
    studio: 'STUDIO 14',
    thelaughingdove: 'THE LAUGHING DOVE',
    tolayatrack: 'TO LAY A TRACK',
    wirsindzwei: 'WIR SIND ZWEI'
  });

  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('style.css');
  eleventyConfig.addPassthroughCopy('script.js');

  return {
    dir: {
      input: '.',
      includes: 'src/_includes',
      output: '_site'
    }
  };
};
