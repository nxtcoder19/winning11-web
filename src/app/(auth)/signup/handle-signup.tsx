"use client"
import { Textfield } from "@/app/atom/textfield";
import { RoutePath } from "@/common/route-path";
import { handleError } from "@/helpers/errors";
import Yup from "@/helpers/yup";
import useForm from "@/hooks/use-form";
import { authRepository } from "@/server/repository/auth-repository";

/* eslint-disable @next/next/no-img-element */
export const HandleSignUp = () => {

    const authApi = authRepository

    const { values, handleChange, handleSubmit, resetValues, isLoading } =
    useForm({
      initialValues:
         {
            name: "",
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

            const response = await authApi.adminSignup({
                name: val.name,
                email: val.email,
                password: val.password,
              });
              console.log("++++", response)

              if (response.isSuccess) {
                console.log('sign up successful!', response.data);
              } else {
                console.error('sign up failed:', response.message);
              }
          
          resetValues();
        } catch (err) {
          handleError(err);
        }
      },
    });

    return (
        <div className={"h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0"}>

            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="login image"
                />
            </div>

            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">

                <span >
                    Sign Up
                </span>
                <div className={"font-semibold text-sm text-slate-500 text-center md:text-left"}>
                <span >
                    Nice to meet you! Enter your details to register.
                </span>
                </div>

                <div className="mb-1 flex flex-col gap-6 py-6">
                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your First Name
                    </Typography> */}
                    <Textfield
                        placeholder="name"
                        type={"text"}
                        name={"name"}
                        value={values.name}
                        onChange={handleChange("name")}
                        // onChange={handleChange}
                    />

                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Last Name
                    </Typography> */}
                    {/* <Textfield
                        placeholder="Last Name"
                        type={"text"}
                        name={"last_name"}
                        // onChange={handleChange}
                    /> */}
                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                    </Typography> */}
                    <Textfield
                        placeholder="email"
                        type={"text"}
                        name={"email"}
                        value={values.email}
                        onChange={handleChange("email")}
                        // onChange={handleChange}
                    />

                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Password
                    </Typography> */}
                    <Textfield
                        placeholder="********"
                        type={"password"}
                        name={"password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        // onChange={handleChange}
                    />
                </div>

                <div className={"py-2"}>
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox"/>
                        <span>I agree the term and conditions</span>
                    </label>
                </div>

                <div
                onClick={handleSubmit}
                 className="text-center md:text-left">
                    <button 
                    // onClick={handleSubmit}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                    >
                        {/* Sign Up */}
                        {isLoading ? "signing up..." : "Signup"}
                    </button>
                </div>

                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account?{" "}
                    <a
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        href={RoutePath.login}
                    >
                        SignIn
                    </a>
                </div>

            </form>
        </div>
    )
}