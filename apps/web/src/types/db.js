/**
 * @typedef {import("pocketbase").RecordModel } RecordModel
 *
 * @typedef {object} User
 * @property {string} id
 * @property {string} created
 * @property {string} updated
 * @property {string} username
 * @property {string=} email
 * @property {boolean} emailVisibility
 * @property {boolean} verified
 * @property {string} name
 * @property {string} avatar
 *
 * @typedef {RecordModel & User } UserRecordModel
 * @typedef {import("pocketbase").RecordAuthResponse<UserRecordModel> } UserAuthRefresh
 *
 * @typedef {object} Post
 * @property {string} id
 * @property {string} created
 * @property {string} updated
 * @property {string} user
 * @property {number} count
 * @property {{user: User}=} expand
 *
 * @typedef {RecordModel & Post} PostRecordModel
 */
