import { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';


export default function UsersComponent() {
    const token = localStorage.getItem('token');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', {
                email,
                name,
                password,
                isAdmin: true,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
             });
            setSuccessMessage('Usuário registrado com sucesso!');
            setErrorMessage(''); // Limpa a mensagem de erro
        } catch (error) {
            setErrorMessage('Erro ao registrar o usuário. Tente novamente.');
            setSuccessMessage(''); // Limpa a mensagem de sucesso
            console.error('Erro no registro:', error);
        }
    };

    return (
        <div className="register-container">
            <Card className="register-card py-3 px-5">
                <h2 className='text-2xl font-semibold mb-2'>Registrar Usuário</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={handleRegister}>
                    <div className="field flex flex-col mb-4">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field flex flex-col mb-4">
                        <label htmlFor="name">Usuário</label>
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field flex flex-col mb-4">
                        <label htmlFor="password">Senha</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='w-full flex justify-content-center'>
                        <Button type="submit" label="Registrar" />
                    </div>
                </form>
            </Card>
        </div>
    );
}
