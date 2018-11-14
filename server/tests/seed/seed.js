const { ObjectID } = require("mongodb");
const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/user");
const jwt = require('jsonwebtoken');

const user1ID = new ObjectID();
const user2ID = new ObjectID();

const users = [{
  _id: user1ID,
  email: "user1@example.com",
  password: "password1",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user1ID, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: user2ID,
  email: "user2@example.com",
  password: "password2",
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user2ID, access: 'auth'}, 'abc123').toString()
  }]
}];

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo",
    _creator: user1ID
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
    _creator: user2ID
  }
];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
