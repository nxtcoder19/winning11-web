/* eslint-disable @next/next/no-img-element */
"use client"
import { CircularIconButton } from "@/app/atom/button";
import { Textfield } from "@/app/atom/textfield";
import { RoutePath } from "@/common/route-path";
import { handleError } from "@/helpers/errors";
import Yup from "@/helpers/yup";
import useForm from "@/hooks/use-form";
import { FacebookIcon, TwitterIcon } from "@/icons/react-icons";
import { authRepository } from "@/server/repository/auth-repository";


export const HandleLogin = () => {

    const authApi = authRepository

    const { values, handleChange, handleSubmit, resetValues, isLoading } =
    useForm({
      initialValues:
         {
            email: "",
            password: ""
          },
        
      validationSchema: Yup.object({
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),        
      }),
      onSubmit: async (val) => {
        try {
            console.log("here", val.email, val.password)

            const response = await authApi.adminSignIn({
                email: val.email,
                password: val.password,
              });
              console.log("++++", response)

              if (response.isSuccess) {
                console.log('Login successful!', response.data);
              } else {
                console.error('Login failed:', response.message);
              }
          
          resetValues();
        } catch (err) {
          handleError(err);
        }
      },
    });

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="login image"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">

                <div className={"pb-6"}>
                    <span >
                        Log In
                    </span>
                    <div className={"font-semibold text-sm text-slate-500 text-center md:text-left"}>
                        <span >
                            Nice to meet you! Enter your details to login.
                        </span>
                    </div>
                </div>

                <div className="flex flex-row text-center md:text-left">
                    <label className="flex justify-center items-center mr-1">Sign in with</label>
                    <CircularIconButton 
                        icon={<FacebookIcon size={20}
                        className="flex justify-center items-center w-full" 
                        />} 
                        onClick={() => {
                            console.log("clicked");
                        }}
                    />
                    <CircularIconButton 
                        icon={<TwitterIcon size={20}
                        className="flex justify-center items-center w-full" 
                        />} 
                        onClick={() => {
                            console.log("clicked");
                        }}
                    />
                </div>

                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                        Or
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={"mb-1 flex flex-col gap-6"}>
                        <Textfield
                            placeholder={"Email Address"}
                            type={"text"}
                            name={"email"}
                            value={values.email}
                            onChange={handleChange('email')}
                            // onChange={handleChange}
                        />
                        <div className={"py-2"}>
                            <Textfield
                                placeholder={"Password"}
                                type={"password"}
                                name={"password"}
                                value={values.password}
                                onChange={handleChange('password')}
                                // onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/*<input type="submit" value="Submit" />*/}
                </form>

                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Remember Me</span>
                    </label>
                    <a
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>

                <div 
                onClick={handleSubmit}
                    className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                        disabled={isLoading}
                    >
                        {/* Login */}
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>

                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Don&apos;t have an account?{" "}
                        <a
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            href= {RoutePath.signup}
                        >
                            Register
                        </a>
                    </div>

            </div>
        </section>
    )
}