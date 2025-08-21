// src/components/Login.tsx
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../../components/ui/button";
import { GoogleIcon } from "../../../components/common/icon";
import LoadingDumbbell from "../../../components/common/loading/Dumble";
import { authSchema } from "../schema/auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { loginApi } from "../../../api/auth-api";
import { useAuth } from "../../../context/authContext";
import { signInWithGoogle } from "../../../api/google-login";
import { toast } from "react-toastify";

type FormData = yup.InferType<typeof authSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
  });

  const handleSignIn = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginApi(data);
      console.log("res", res);

      if (res?.token && res?.user) {
        login(res.user, res.token);
      }
      toast.success("Login successfull!");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await signInWithGoogle();
      // if (res?.user && res?.token) {
      //   login(res.user, res.token);
      //   navigate("/");
      // }
      console.log(res);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Google login failed. Please try again.";
      setError(errorMessage);
      console.error("Google login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-username" className="text-text">
            Name
          </Label>
          <Input
            id="signin-username"
            placeholder="nguyenvana@gmail.com"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-text">
            Password
          </Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="pt-3">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <LoadingDumbbell className="!text-white" /> Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div className="text-text-secondary font-thin italic text-sm flex justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-accent-blue"
          >
            <MoveLeft />
            Back to home
          </Link>
          <p className="hover:underline cursor-pointer">Forgot password?</p>
        </div>
      </form>

      <div className="mt-4">
        <Separator className="my-4" />
        <div className="text-center text-sm text-text-primary mb-4">
          or login with
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full border border-borderlight"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <GoogleIcon /> Google
        </Button>
      </div>
    </>
  );
};

export default Login;
