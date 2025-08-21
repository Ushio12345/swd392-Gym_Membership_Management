import { Dumbbell } from "lucide-react";
import Bg from "../../assets/images/auth-image.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Login from "./patials/Login";
import Register from "./patials/Register";

const Auth = () => {
  return (
    <div className="  min-h-screen relative overflow-y-auto flex flex-col items-center py-10 bg-background text-primary ">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 "
        style={{ backgroundImage: `url(${Bg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="text-center space-y-5">
          <div className="flex justify-center mb-4">
            <div className="p-5 bg-white rounded-full shadow-md">
              <Dumbbell className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">GymBow</h1>
          <p className="mt-2 text-lg text-text-secondary">
            Book your gym membership
          </p>
        </div>
      </header>

      {/* Card */}
      <Card className=" relative z-10 w-full max-w-md bg-card border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-text-primary">
            Welcome!
          </CardTitle>
          <CardDescription className="text-center text-text-secondary">
            Sign in or create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary rounded-lg">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <Register />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
