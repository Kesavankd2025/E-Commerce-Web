import { SIZE_ORDER, productThumbConfig, colorSets } from './data.js';

export function slugifyProductName(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function deriveSizeOptions(metaText) {
  const normalized = String(metaText || '').toUpperCase();
  const match = normalized.match(/(XS|S|M|L|XL|2XL|3XL|4XL|5XL)\s*-\s*(XS|S|M|L|XL|2XL|3XL|4XL|5XL)/);
  if (match) {
    const start = SIZE_ORDER.indexOf(match[1]);
    const end = SIZE_ORDER.indexOf(match[2]);
    if (start !== -1 && end !== -1) {
      return SIZE_ORDER.slice(Math.min(start, end), Math.max(start, end) + 1);
    }
  }
  const found = SIZE_ORDER.filter((s) => normalized.includes(s));
  return found.length ? found : ['S', 'M', 'L', 'XL'];
}

export function hashText(value) {
  return Array.from(String(value || '')).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

export function buildProductProfile(product, allProducts) {
  const seed = hashText(product.slug);
  const sizes = deriveSizeOptions(product.meta);
  const customThumbs = Array.isArray(productThumbConfig[product.slug])
    ? productThumbConfig[product.slug].filter((src) => typeof src === 'string' && src.trim())
    : [];

  let gallery = [];
  if (customThumbs.length) {
    gallery = [...new Set(customThumbs)];
  } else {
    const galleryPool = allProducts.filter((item) => item.slug !== product.slug).map((item) => item.image);
    gallery = [product.image];
    for (let i = 0; i < 3 && galleryPool.length; i++) {
      gallery.push(galleryPool[(seed + i * 3) % galleryPool.length]);
    }
  }

  const comfortWords = ['second-skin comfort', 'structured stretch', 'day-long softness', 'breathable support'];
  const fitWords = ['streamlined silhouette', 'comfortable hold', 'clean everyday fit', 'flexible movement fit'];
  const useWords = ['daily routines', 'office wear', 'travel days', 'weekend styling'];

  const comfort = comfortWords[seed % comfortWords.length];
  const fit = fitWords[(seed + 1) % fitWords.length];
  const useCase = useWords[(seed + 2) % useWords.length];
  let colors = colorSets[seed % colorSets.length];
  let colorVariants = null;

  // Product-specific color configs
  if (product.slug === 'ankle-length-leggings-with-elasticated-waist-for-women') {
    colors = [
      { label: 'Premium Essence', swatch: '#fe4b58' }, { label: 'Charcoal Grey', swatch: '#2E2E2E' },
      { label: 'Deep Olive', swatch: '#3B4D3A' }, { label: 'Navy Blue', swatch: '#1F2A44' },
      { label: 'Chocolate Brown', swatch: '#4A2C2A' }, { label: 'Dusty Rose', swatch: '#C47A8C' },
    ];
    colorVariants = {
      'Premium Essence': ['/images/new-products/IMG_9066.jpg','/images/new-products/IMG_9067.jpg','/images/new-products/IMG_9068.jpg','/images/new-products/IMG_9069.jpg','/images/new-products/IMG_9070.jpg'],
      'Charcoal Grey': ['/images/new-products/charcol gray.png','/images/new-products/Deepolive.png','/images/new-products/navyblue.png','/images/new-products/chocolate brown.png','/images/new-products/dusty rose.png'],
      'Deep Olive': ['/images/new-products/Deepolive.png','/images/new-products/charcol gray.png','/images/new-products/navyblue.png','/images/new-products/chocolate brown.png','/images/new-products/dusty rose.png'],
      'Navy Blue': ['/images/new-products/navyblue.png','/images/new-products/charcol gray.png','/images/new-products/Deepolive.png','/images/new-products/chocolate brown.png','/images/new-products/dusty rose.png'],
      'Chocolate Brown': ['/images/new-products/chocolate brown.png','/images/new-products/charcol gray.png','/images/new-products/Deepolive.png','/images/new-products/navyblue.png','/images/new-products/dusty rose.png'],
      'Dusty Rose': ['/images/new-products/dusty rose.png','/images/new-products/charcol gray.png','/images/new-products/Deepolive.png','/images/new-products/navyblue.png','/images/new-products/chocolate brown.png'],
    };
    gallery = colorVariants['Premium Essence'];
  } else if (product.slug === 'you-womens-regular-fit-ankle-length-leggings') {
    colors = [{ label: 'Deep Olive', swatch: '#3B4D3A' }, { label: 'Cream Beige', swatch: '#E8D9B5' }, { label: 'Soft Black', swatch: '#1C1C1C' }, { label: 'Coffee Brown', swatch: '#6F4E37' }];
    colorVariants = {
      'Deep Olive': ['/images/Nude Comfort Ankle/_DSC8045-Edit.jpg','/images/Nude Comfort Ankle/_DSC8028-Edit.jpg','/images/Nude Comfort Ankle/_DSC8016-Edit.jpg'],
      'Cream Beige': ['/images/Nude Comfort Ankle/creame.png','/images/Nude Comfort Ankle/creame2.png','/images/Nude Comfort Ankle/creame3.png'],
      'Soft Black': ['/images/Nude Comfort Ankle/black.png','/images/Nude Comfort Ankle/black2.png','/images/Nude Comfort Ankle/black3.png'],
      'Coffee Brown': ['/images/Nude Comfort Ankle/brown.png','/images/Nude Comfort Ankle/brown2.png','/images/Nude Comfort Ankle/brown3.png'],
    };
    gallery = colorVariants['Deep Olive'];
  } else if (product.slug === 'you-womens-4-way-stretch-ankle-length-leggings') {
    colors = [{ label: 'Coral', swatch: '#f96563' }, { label: 'Warm Nude Beige', swatch: '#ac7c66' }, { label: 'Dusty Rose', swatch: '#C3686F' }, { label: 'Soft Mocha Brown', swatch: '#5a4238' }];
    colorVariants = {
      'Coral': ['/images/Cobalt Core Legging/_DSC8962.jpg','/images/Cobalt Core Legging/_DSC8954.jpg'],
      'Warm Nude Beige': ['/images/Cobalt Core Legging/Warm Nude Beige.png','/images/Cobalt Core Legging/Dusty Rose.png','/images/Cobalt Core Legging/Soft Mocha Brown.png'],
      'Dusty Rose': ['/images/Cobalt Core Legging/Dusty Rose.png','/images/Cobalt Core Legging/Warm Nude Beige.png','/images/Cobalt Core Legging/Soft Mocha Brown.png'],
      'Soft Mocha Brown': ['/images/Cobalt Core Legging/Soft Mocha Brown.png','/images/Cobalt Core Legging/Warm Nude Beige.png','/images/Cobalt Core Legging/Dusty Rose.png'],
    };
    gallery = colorVariants['Coral'];
  } else if (product.slug === 'you-women-slim-fit-mid-rise-leggings') {
    colors = [{ label: 'Beige', swatch: '#c59a7e' }, { label: 'Deep Black', swatch: '#1E1E1E' }, { label: 'Navy Blue', swatch: '#283C6E' }, { label: 'Dark Olive', swatch: '#46553C' }];
    colorVariants = {
      'Beige': ['/images/Aqua Flex Active/_DSC9026-Edit.jpg','/images/Aqua Flex Active/_DSC9021-Edit.jpg','/images/Aqua Flex Active/_DSC9004-Edit.jpg'],
      'Deep Black': ['/images/Aqua Flex Active/black.png','/images/Aqua Flex Active/navy blue.png','/images/Aqua Flex Active/olive.png'],
      'Navy Blue': ['/images/Aqua Flex Active/navy blue.png','/images/Aqua Flex Active/black.png','/images/Aqua Flex Active/olive.png'],
      'Dark Olive': ['/images/Aqua Flex Active/olive.png','/images/Aqua Flex Active/black.png','/images/Aqua Flex Active/navy blue.png'],
    };
    gallery = colorVariants['Beige'];
  }

  return {
    description: `${product.name} is designed for ${comfort} with a ${fit}. It is built to keep shape and comfort through ${useCase}.`,
    specifications: [`Category: ${product.category}`, `Fit profile: ${fit.charAt(0).toUpperCase()}${fit.slice(1)}`, `Available sizes: ${sizes.join(', ')}`, `MRP: ${product.price}`],
    fabrication: ['Premium cotton-elastane blend with smooth finish', '4-way stretch knit for flexible movement', 'Color retention treatment for long-lasting shade', 'Reinforced stitching for repeated-wear durability'],
    sizes,
    colors,
    gallery,
    colorVariants,
  };
}
