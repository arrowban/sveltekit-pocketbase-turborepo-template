/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

    collection.viewRule = '@request.auth.id != ""';

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

    collection.viewRule = 'id = @request.auth.id';

    return dao.saveCollection(collection);
  }
);
