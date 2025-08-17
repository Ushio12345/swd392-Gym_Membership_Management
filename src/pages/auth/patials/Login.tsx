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

type FormData = yup.InferType<typeof authSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
  });

  const handleSignIn = (data: FormData) => {
    setLoading(true);
    console.log("Sign in with:", data.email, data.password);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In...");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-text">
            Email
          </Label>
          <Input
            id="signin-email"
            placeholder="nguyenvana@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-text">
            Mật khẩu
          </Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Nhập mật khẩu"
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
                <LoadingDumbbell className="!text-white" /> Đợi tí nhé...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <Separator className="my-4" />
        <div className="text-center text-sm text-text-primary mb-4">
          Hoặc đăng nhập với
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full border border-borderlight"
          onClick={handleGoogleSignIn}
        >
          <GoogleIcon /> Google
        </Button>
      </div>
    </>
  );
};

export default Login;
