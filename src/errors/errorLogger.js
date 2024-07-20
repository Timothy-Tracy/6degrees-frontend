export function logError(source, error, info = {}) {
    console.error(`Error from ${source}:`, error);
    console.error('Additional Info:', info);
    // TODO: Implement integration with your preferred error logging service
  }