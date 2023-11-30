import {useState} from 'react'

const Login = () => {
    const [loginData, setLoginData] = useState({username: '', password: ''})

    function handleChange(event) {
        const {name, value} = event.target
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function signIn(event) {
        event.preventDefault()
        if (loginData.username === '' || loginData.password === '') {
            console.log('Please enter username and/or password');
            return
        } else {
            console.log(loginData);
        }
    }

    return (
        <div className='login--container'>
            <form className='login--form' onSubmit={signIn}>
                <input type='text' placeholder='Username' name='username' value={loginData.username} onChange={handleChange} />
                <input type='password' placeholder='Password' name='password' value={loginData.password} onChange={handleChange} />
                <button>Sign in</button>
            </form>
        </div>
    )
}

export default Login
