/**
 * Controller class for handling contact-related operations
 * @class ContactController
 */
class ContactController {

  static API_ENDPOINTS = {
    SINGLE_POST: '/api/contact',
  };

  /**
   * Default request headers for API calls
   * @private
   */
  static #defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  /**
   * Makes an API request with error handling
   * @private
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Request options
   * @returns {Promise<any>} - Parsed response data
   * @throws {Error} - Custom error with status code and message
   */
  static async #makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.#defaultHeaders,
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

  /**
   * Updates the like count for a post
   * @public
   * @returns {Promise<number>} Updated like count
   * @throws {Error} If update fails
   * @param body
   */
  static async send(body) {
    try {
      return await this.#makeRequest(this.API_ENDPOINTS.SINGLE_POST, {
        method: 'POST',
        body: JSON.stringify(body)
      });
    } catch (error) {
      throw new Error('Unable to send contact request');
    }
  }
}

export default ContactController;