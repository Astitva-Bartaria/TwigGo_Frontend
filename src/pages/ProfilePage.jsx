import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Check,
  Loader2,
  LogOut,
  Mail,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    isDeleteModalOpen,
    openDeleteModal,
    logout,
  } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.fullName) {
      setFullName(authUser.fullName);
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({
        profilePic: base64Image,
        fullName,
      });
    };
  };

  const handleNameUpdate = async () => {
    await updateProfile({
      profilePic: selectedImg || authUser.profilePic,
      fullName,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pt-12">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-200 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-base-300 rounded-lg border focus:outline-none"
                  disabled={isUpdatingProfile}
                />
                {fullName !== authUser.fullName && (
                  <button
                    onClick={handleNameUpdate}
                    disabled={isUpdatingProfile}
                    className="btn btn-primary p-auto rounded"
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Check size="20" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-300 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Login</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Logout</span>
                  <button type="button" onClick={handleLogout}>
                    <LogOut className="size-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2 text-error">
                  <span>Delete Account</span>
                  <button type="button" onClick={() => openDeleteModal()}>
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>
              {isDeleteModalOpen && <DeleteModal />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
