module.exports = app => {
    //获取数据类型
    const { STRING, INTEGER, DATE } = app.Sequelize;
    //定义表define("表明",{字段})
    const Sex = app.model.define('sex', {
        s_id: {
            type: INTEGER, //规定数据类型
            primaryKey: true, //主键
            autoIncrement: true, //自动增长
            unique: true, //是否唯一
        },
        s_name: STRING,
        s_sex: STRING, //直接规定数据类型

    });
    //设置返回值
    return Sex;
}