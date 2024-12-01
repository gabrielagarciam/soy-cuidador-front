/**
 * Controller class for handling common operations
 * @class BaseController
 */
class BaseController {

  /**
   * Default request headers for API calls
   * @private
   */
  static defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  /**
   * Makes an API request with error handling
   * @protected
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Request options
   * @returns {Promise<any>} - Parsed response data
   * @throws {Error} - Custom error with status code and message
   */
  static async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON response from server');
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}

export default BaseController;