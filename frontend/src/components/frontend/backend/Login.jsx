import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { useForm } from "react-hook-form"

export const Login = () => {
   
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {console.log(data)}

  return (
   <>
   <Header/>
   <main>
    <div className="login-container my-5">
        <div className="login-card">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className='mb-3'>Tai khoan cua ban</h4>
                        <div className="mb-3">
                                <label htmlFor="" className='form-label'>email</label>
                                <input  {
                                    ...register("email",{
                                    required:"Email khong duoc de trong",})
                                }
                                type="text" placeholder='Email' className='form-control'/>
                                {errors.email && <p>{errors.email?.message}</p>}

                        </div>
                        <div className="mb-3">
                                <label htmlFor="" className='form-label'>Password</label>
                                <input type="password" placeholder='Password' className='form-control'/>
                        </div>
                        <button type='submit' className='btn-login'>Login</button>
                    </form>
        </div>

    </div>
   </main>
   <Footer/>

   </>
  )
}
export default Login