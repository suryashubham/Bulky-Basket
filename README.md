# Bulky-Basket
 A platform for the user where user can buy a product in bulk.


## Sequleize-Commands

1. To create a table

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,middleName:string,verified:boolean,active:boolean,role:string,gst:string,email:string,mobile:bigint,bio:text`

`npx sequelize-cli model:generate --name Address --attributes house_number:bigint,street:string,city:string,zipCode:string,state:string,landmark:string,desc:string,`

2. define association:

`
    User.hasOne(models.Address, {
    foreignKey: 'userId',
    as: 'address',
    onDelete: 'CASCADE'
    });
`
userId is the column in the Address table that will store the ID of the User that owns that Address
The foreignKey establishes that the Address will reference the User through this column.
In this setup, the Address model will have a column userId that references the id column in the User table.

3. Migrate command `npx sequelize-cli db:migrate`
4. Undo a particular migration `sequelize db:migrate:undo --name <migration_file_name>`
