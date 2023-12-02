// modelTests.js
const expect = require('chai').expect;
const sinon = require('sinon');
const todoModel = require('../models/todoModel');
const fs = require('fs');

describe('Todo Model', () => {
    beforeEach(() => {
        sinon.stub(fs, 'writeFileSync');
        sinon.stub(fs, 'readFileSync').returns(JSON.stringify([]));
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create a new todo', () => {
        const newTodo = { id: 1, title: 'Test Todo', state: 0, description: 'Test description' };
        todoModel.createOne(newTodo);
        expect(fs.writeFileSync.calledOnce).to.be.true;
    });

    it('should retrieve all todos', () => {
        const todos = todoModel.getAll();
        expect(todos).to.be.an('array');
    });

    it('should retrieve a todo by id', () => {
        sinon.restore(); // Restaurer pour configurer un nouveau comportement pour readFileSync
        sinon.stub(fs, 'readFileSync').returns(JSON.stringify([{ id: 1, title: 'Test Todo' }]));

        const todo = todoModel.getOneById(1);
        expect(todo).to.not.be.undefined;
        expect(todo.id).to.equal(1);
    });

    it('should update a todo', () => {
        const updatedTodo = { title: 'Updated Test Todo' };
        todoModel.updateOne(1, updatedTodo);
        expect(fs.writeFileSync.calledOnce).to.be.true;
    });

    it('should delete a todo', () => {
        todoModel.deleteOne(1);
        expect(fs.writeFileSync.calledOnce).to.be.true;
    });

    // Ajoutez plus de tests si nécessaire
});
