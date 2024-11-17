'use client';

import {FormEvent, useState} from "react";

interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export default function Todos(props: {data: TodoItem[], userId: number}) {
    const [todos, setTodos] = useState(props.data);
    const [newTodoTitle, setNewTodoTitle] = useState("");

    const markCompleted = async (todoId: number) => {
        try {
            const res = await fetch(`/api/todos/${todoId}/complete`, {
                method: 'POST',
            });

            if (res.ok) {
                // Refresh the todos list
                const updatedTodos = todos.map((todo) =>
                    todo.id === todoId ? { ...todo, completed: true } : todo
                );
                setTodos(updatedTodos);
            } else {
                console.error('Failed to mark todo as completed');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTodoTitle, userId: props.userId }),
        });

        const data = await response.json();

        if (response.ok) {
            setTodos([data.item, ...todos]);
            setNewTodoTitle("");
        } else {
            console.error("Error:", data.message);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-xl mx-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">My To-Dos</h1>

            <form onSubmit={handleFormSubmit} className="flex mb-4">
                <input
                    name="title"
                    type="text"
                    placeholder="New To-Do"
                    required
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="px-4 py-3 bg-indigo-600 text-white font-semibold rounded-r-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >
                    Add
                </button>
            </form>

            <ul className="space-y-3">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`p-4 border border-gray-200 rounded-md shadow-sm flex justify-between items-center ${
                            todo.completed ? 'bg-green-100' : 'bg-yellow-100'
                        }`}
                    >
                        <span className="font-semibold text-gray-700">{todo.title}</span>
                        {!todo.completed && (
                            <button
                                className="px-2 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-blue-600"
                                onClick={() => markCompleted(todo.id)}
                            >
                                Mark Completed
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
