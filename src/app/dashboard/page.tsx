import {getTodos} from "@/actions/todo/getTodos";
import {getAuthUser} from "@/actions/auth/getAuthUser";
import NotFound from "next/dist/client/components/not-found-error";
import LogoutButton from "@/chunks/LogoutButton";
import Todos from "@/chunks/Todos";

export default async function Dashboard() {
    const {user} = await getAuthUser();

    if (!user) {
        return <NotFound/>
    }

    const todos = await getTodos(user.id);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    {user ? (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">Welcome back!</h2>
                                <p className="text-gray-600">Email: {user.email}</p>
                                <p className="text-gray-600">User ID: {user.id}</p>
                            </div>
                            <LogoutButton/>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-600">Loading user details...</p>
                        </div>
                    )}
                </div>
                <Todos data={todos} userId={user.id} />
            </div>
        </div>
    );
}
