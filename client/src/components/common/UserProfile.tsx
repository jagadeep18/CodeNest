import { useAppContext } from "@/context/AppContext"
import { FaSignOutAlt } from "react-icons/fa"
import { toast } from "react-hot-toast"

const UserProfile = () => {
    const { currentUser, isAuthenticated, logout } = useAppContext()

    if (!isAuthenticated) {
        return null
    }

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully")
    }

    return (
        <div className="flex items-center justify-between rounded-md border border-gray-600 bg-darkHover p-3">
            <div className="flex items-center gap-2">
                {currentUser.profilePicture && (
                    <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                    />
                )}
                <div className="text-sm">
                    <p className="font-semibold text-gray-200">{currentUser.username}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="rounded p-2 text-gray-400 hover:bg-red-500 hover:text-white"
                title="Logout"
            >
                <FaSignOutAlt size={16} />
            </button>
        </div>
    )
}

export default UserProfile
