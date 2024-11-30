/**
 * Controller class for handling subscribe-related operations
 * @class SubscribeController
 */
class SubscribeController {
  static API_ENDPOINTS = {
    SUBSCRIBE: "/api/subscribe",
  };

  /**
   * Default request headers for API calls
   * @private
   */
  static #defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
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
    return fetch(urll, {
      ...options,
      headers: {
        ...this.#defaultHeaders,
        ...options.headers,
      },
    }).then((response) => {
      if (!response.ok) {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          message: response.statusText,
        });
      }
      return response.json();
    });
  }

  /**
   * Register an email in subscribers list
   * @public
   * @returns {Promise<number>} Updated like count
   * @throws {Error} If email register fails
   * @param body
   */
  static async subscribe(body) {
    try {
      return await this.#makeRequest(this.API_ENDPOINTS.SUBSCRIBE, {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default SubscribeController;
