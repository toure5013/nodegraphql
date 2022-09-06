import { users } from "./db";

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      return users;
    },
    user: (parent, { id }, context, info) => {
      return users.find(user => user.id == id);
    },
  },

  Mutation: {
    createUser: (parent, { id, name, email, age }, context, info) => {
      const newUser = { id, name, email, age };

      users.push(newUser);

      return newUser;
    },
    updateUser: (parent, { id, name, email, age }, context, info) => {

      console.log(id, name);
      let newUser = users.find(user => user.id == id);

      newUser.name =  name ? name : newUser.name;
      newUser.email = email ? email : newUser.email;
      newUser.age = age ? age : newUser.age;

        return newUser;
    },

    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex(user => user.id == id);

      if (userIndex == -1) throw new Error("User not found.");

      const deletedUsers = users.splice(userIndex, 1);


      console.log(deletedUsers);
      
      return deletedUsers[0];
    }
  }
};

export default resolvers;