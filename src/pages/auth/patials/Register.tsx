import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { GoogleIcon } from "../../../components/common/icon";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../schema/auth";
import LoadingDumbbell from "../../../components/common/loading/Dumble";

type FormData = yup.InferType<typeof authSchema>;

const Register = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
  });

  const handleSignUp = (data: FormData) => {
    console.log("Sign up with:", data.username, data.password);
    setLoading(true);
    // TODO: gọi API register
    setTimeout(() => setLoading(false), 1000);
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up...");
    // TODO: gọi API Google OAuth2
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-username" className="text-text">
            username
          </Label>
          <Input
            id="signup-username"
            type="username"
            placeholder="your@username.com"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password " className="text-text">
            Password
          </Label>
          <Input
            id="signup-password"
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
                <LoadingDumbbell className="!text-white " /> Loading...
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <Separator className="my-4" />
        <div className="text-center text-sm text-text-primary mb-4">
          or register with
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full border border-borderlight"
          onClick={handleGoogleSignUp}
        >
          <GoogleIcon /> Google
        </Button>
      </div>
    </>
  );
};

export default Register;
