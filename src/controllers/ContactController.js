import BaseController from "./BaseController.js";

/**
 * Controller class for handling contact-related operations
 * @class ContactController
 */
class ContactController extends BaseController {

  static API_ENDPOINTS = {
    SINGLE_POST: '/api/contact',
  };

  /**
   * Updates the like count for a post
   * @public
   * @returns {Promise<number>} Updated like count
   * @throws {Error} If update fails
   * @param body
   */
  static async send(body) {
    try {
      return await super.makeRequest(this.API_ENDPOINTS.SINGLE_POST, {
        method: 'POST',
        body: JSON.stringify(body)
      });
    } catch (error) {
      throw new Error('Unable to send contact request');
    }
  }
}

export default ContactController;