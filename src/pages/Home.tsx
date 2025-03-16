import app from "@/firebaseApp";
import useAuth from "@/hooks/common/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const user = useAuth();

  const auth = getAuth(app);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    toast.success("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-y-50">
      <div className="flex items-center justify-between font-medium text-16">
        <p className="text-main">User: {user?.email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="px-20 py-10 duration-300 border-4 border-black rounded-12 hover:bg-black hover:text-main"
        >
          로그아웃
        </button>
      </div>
      <div className="flex flex-col items-center space-y-30">
        <Link
          to="/surveys/new"
          className="w-full font-medium text-center transition-all duration-300 border-black shadow-lg border-5 py-30 rounded-12 text-20 hover:bg-black hover:text-main"
        >
          설문지 만들기
        </Link>
        <div>fsdaf</div>
        <div>fsdaf</div>
        <div>fsdaf</div>
        <div>fsdaf</div>
        <div>fsdaf</div>
        <div>fsdaf</div>
      </div>
    </div>
  );
}
