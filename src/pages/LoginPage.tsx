import app from "@/firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("로그인에 성공했습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("로그인에 실패했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute w-full -translate-y-1/2 top-1/2 "
    >
      <h1 className="font-medium text-center text-32 mb-30">로그인</h1>
      <div className="relative flex flex-col space-y-4 mb-30">
        <label htmlFor="email" className="font-medium text-16">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register("email", {
            required: true,
            pattern: {
              value: emailRegex,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
          className="outline-none py-17 pl-9 pr-21 focus:bg-bg2"
        />
        {errors.email && (
          <p className="absolute text-red-500 text-14 top-full">
            {errors.email.message as string}
          </p>
        )}
      </div>
      <div className="relative flex flex-col space-y-4 mb-30">
        <label htmlFor="password" className="font-medium text-16">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
            },
            maxLength: {
              value: 20,
              message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
            },
          })}
          className="outline-none py-17 pl-9 pr-21 focus:bg-bg2"
        />
        {errors.password && (
          <p className="absolute text-red-500 text-14 top-full">
            {errors.password.message as string}
          </p>
        )}
      </div>
      <Link
        to="/signup"
        className="underline text-14 text-gray600 underline-offset-4"
      >
        회원이 아니신가요?
      </Link>
      <button
        type="submit"
        className="w-full py-20 mt-20 font-medium transition-all duration-300 border-2 border-black text-16 bg-bg2 hover:bg-black hover:text-white"
      >
        로그인
      </button>
    </form>
  );
}
