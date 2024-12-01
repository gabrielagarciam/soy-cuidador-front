import BaseController from "./BaseController.js";

/**
 * Controller class for handling subscribe-related operations
 * @class SubscribeController
 */
class SubscribeController extends BaseController {
  static API_ENDPOINTS = {
    SUBSCRIBE: "/api/subscribe",
  };

  /**
   * Register an email in subscribers list
   * @public
   * @returns {Promise<number>} Updated like count
   * @throws {Error} If email register fails
   * @param body
   */
  static async subscribe(body) {
    try {
      return await super.makeRequest(this.API_ENDPOINTS.SUBSCRIBE, {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default SubscribeController;
