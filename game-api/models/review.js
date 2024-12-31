// C:\lkh\project\reactNode\game-api\models\review.js

const Sequelize = require('sequelize')

module.exports = class Review extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            //글내용
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Review',
            tableName: 'reviews',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Review.belongsTo(db.User)
   }
}

/*
underscored 옵션은 Sequelize를 사용할 때 데이터베이스 열 이름 형식을 조정하고 코드 가독성을 높이는 데 매우 유용한 설정입니다.

데이터베이스 열 이름의 표준 형식을 snake_case로 유지하면서도, 자바스크립트 코드에서는 camelCase를 사용하여 가독성과 일관성을 높일 수 있습니다.
팀 내에서 데이터베이스와 코드 간의 명명 규칙을 일관성 있게 유지하는 데 유용합니다. */

/* 
paranoid는 Sequelize에서 제공하는 옵션으로, 
모델이 soft delete(소프트 삭제)를 지원하도록 설정하는 기능입니다.

soft delete
데이터를 실제로 삭제하지 않고 deletedAt 필드에 삭제 시간 기록. */
