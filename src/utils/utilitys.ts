/* eslint-disable no-nested-ternary */
export const transformPath = (path: string) => {
  // Remove leading slash and replace hyphens with spaces
  const formattedString = path.replace(/^\/|[-]/g, ' ');

  // Capitalize each word
  const transformedString = formattedString.replace(/\b\w/g, (c) =>
    c.toUpperCase()
  );

  return transformedString.trim();
};

export const hexToRgba = (hex: string, opacity: number): string => {
  // Ensure the hex color is valid
  const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  if (!isValidHex) {
    throw new Error('Invalid hex color code');
  }

  // Remove the hash from the hex code
  const hexWithoutHash = hex.replace('#', '');

  // Parse the hex values for red, green, and blue
  const bigint = parseInt(hexWithoutHash, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Ensure the opacity value is within the valid range [0, 1]
  const validOpacity = Math.min(1, Math.max(0, opacity));

  // Return the RGBA color
  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
};

export const capitalizeFirstLetter = (string: any) => {
  return string
    .replace(/\b\w/g, (match: any) => match.toUpperCase())
    .replace(/-/g, ' ');
};

export const formatRupiah = (angka: string, prefix: string) => {
  let separator = '';
  const number_string = angka.replace(/[^,\d]/g, '').toString();
  const split = number_string.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? `${rupiah},${split[1]}` : rupiah;
  return prefix === undefined ? rupiah : rupiah ? `Rp. ${rupiah}` : '';
};

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const removeEmptyValues = (object: any) => {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var value = object[key];
      if (value === null || value === undefined || value === '') {
        delete object[key];
      }
    }
  }
  return object;
};

export const transformStringToKey = (input: string): string => {
  const transformed = input.replace(/\s/g, '_').toUpperCase();

  return transformed;
};
