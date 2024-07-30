/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: 'eqee25l2eod5yc9',
      created: '2024-07-30 03:33:16.509Z',
      updated: '2024-07-30 03:33:16.509Z',
      name: 'posts',
      type: 'base',
      system: false,
      schema: [
        {
          system: false,
          id: 'typah2jc',
          name: 'user',
          type: 'relation',
          required: true,
          presentable: false,
          unique: false,
          options: {
            collectionId: '_pb_users_auth_',
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: null
          }
        },
        {
          system: false,
          id: '43edmncd',
          name: 'count',
          type: 'number',
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: false
          }
        }
      ],
      indexes: [],
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: 'user = @request.auth.id',
      updateRule: 'user = @request.auth.id',
      deleteRule: 'user = @request.auth.id',
      options: {}
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('eqee25l2eod5yc9');

    return dao.deleteCollection(collection);
  }
);
