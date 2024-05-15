module.exports = (sequelize, DataTypes) => {
  const Tutorial = sequelize.define("Tutorial", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Name can not be empty or null!" } }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Username can not be empty or null!" }}
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Email can not be empty or null!" } }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Password can not be empty or null!" } }
      },
      type: {
        //type
      },
      profilePicLink: {
        //profilePcicLink
      },
      /*---*/
      adress: {
        //adress
      },
      zipCode: {
        //zipCode
      },
      /*---*/
      currentXP: {
        //currentXP
      },
      currentLevel: {
        //currentLevel
      }
    }, { timestamps: false }
  );
  return Tutorial;
};