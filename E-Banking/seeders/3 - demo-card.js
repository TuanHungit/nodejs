'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      "status": "true",
      "used": "true",
      "issuingNetwork": "JCB",
      "cardNumber": 3096042192079516,
      "provideDate": "2020-01-01",
      "expirationDate": "2020-03-01",
      "accountId": 2
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "JCB",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 3112189644589046,
        "accountId": 3
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "JCB",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 3112412731895070,
        "accountId": 4
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "Visa",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 4716911638835269,
        "accountId": 2
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "Visa",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 4485202077076287,
        "accountId": 3
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "Visa",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 4485448620547452,
        "accountId": 4
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 5155202866084522,
        "accountId": 2
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 5491765109955545,
        "accountId": 3
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 5563198681697975,
        "accountId": 1
      },
      {
        "status": "true",
        "used": "false",
        "issuingNetwork": "JCB",
        "provideDate": "2020-01-01",
        "expirationDate": "2020-03-01",
        "cardNumber": 3158107069100615,
        "accountId": 10
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3096047848103347
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3096512650172417
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3112764275319986
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3337847272690456
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3158107069100615
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3096221149980063
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3096944077604385
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3088591717607169
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3096001029993513
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3112729888157156
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3088885474697938
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3088006596567475
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "JCB",
        "cardNumber": 3088591464628426
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4716911638835269
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4485202077076287
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4485448620547452
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4916017862383238
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4556248888346777
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4916380692376198
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4532950922587071
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4556695608910722
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4024007129039722
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4556638783152249
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4696030282864519
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4485173960684125
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4485156933308534
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4556838059101454
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "Visa",
        "cardNumber": 4716960179452216
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5155202866084522
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5491765109955545
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5563198681697975
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5489295770693252
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5408419798092929
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5122290679544212
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5367617702129278
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5173640498130684
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5124602944808289
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5550461151210405
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5439198650889498
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5175341888849680
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5152195657113356
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5359026605370486
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5126924192304953
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5357671716644535
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5160357410521784
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5189895224907019
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5199470828603428
      },
      {
        "status": "false",
        "used": "false",
        "issuingNetwork": "MasterCard",
        "cardNumber": 5236773057866631
      }
    ]
    data.map(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
      return item;
    });
    return queryInterface.bulkInsert('CreditCards', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CreditCards', null, {});

  }
};