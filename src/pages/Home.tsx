import app from "@/firebaseApp";
import useAuth from "@/hooks/common/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const auth = getAuth(app);

  const user = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    toast.success("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <>
      <h1 className="my-40 font-bold text-center select-none text-52 text-main">
        SurvForm
      </h1>
      <div className="flex justify-end mb-30">
        <button
          type="button"
          onClick={handleLogout}
          className="px-10 py-5 duration-300 border-b-2 border-black hover:text-main hover:border-main"
        >
          로그아웃
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center space-y-30">
          <Link
            to="/surveys/new"
            className="w-full font-medium text-center transition-all duration-300 border-4 border-black shadow-lg py-50 rounded-12 text-16 hover:bg-black hover:text-white"
          >
            설문지 만들기
          </Link>
          <Link
            to={`/surveys/${user?.uid}/list`}
            className="w-full font-medium text-center transition-all duration-300 border-4 border-black shadow-lg py-50 rounded-12 text-16 hover:bg-black hover:text-white"
          >
            내가 만든 설문지 보기 (수정 / 통계)
          </Link>
        </div>
      </div>
    </>
  );
}
