import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const username = watch("username");

  const onSubmit = (data: FormData) => {
    setUsername(data.username);
    toast.success(`Welcome, ${data.username}!`);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg">
        <h1 className="text-lg md:text-[22px] font-bold text-black mb-4 text-center md:text-left">
          Welcome to CodeLeap network!
        </h1>
        <p className="text-gray-700 text-md md:text-base mb-2 text-center md:text-left">
          Please enter your username
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("username")}
              placeholder="John Doe"
              className="w-full px-4 h-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex justify-center md:justify-end">
            <Button variant="primary" disabled={!username} type="submit">
              ENTER
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
