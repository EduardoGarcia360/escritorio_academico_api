export const isOriginAllowed = (origin, allowedOrigins) => {
  return allowedOrigins.some((dominio) => {
    if (typeof dominio === "string") {
      const result = dominio === origin;
      // console.log('isOriginAllowed', result, origin, dominio);
      return result;
    }
    if (dominio instanceof RegExp) {
      const result = dominio.test(origin);
      // console.log('isOriginAllowed RegExp', result, origin, dominio);
      return result;
    }
    return false;
  });
};
