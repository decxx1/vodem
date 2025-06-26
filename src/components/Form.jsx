import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { 
    SECRET_KEY,
    SITE_KEY,
    ENDPOINT,
    EMAIL
 } from 'astro:env/client';
export default function Form() {
    const [isSending, setIsSending] = useState(false);
    const resetForm = () => {
        document.getElementById('contactForm').reset();
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target))
        
        fields.secret_key = SECRET_KEY;
        fields.addressee = EMAIL;
        fields.asunto = "Contacto desde la web - de: " + fields.name;
        if(!isSending){
            setIsSending(true);
            grecaptcha.ready(function() {
                grecaptcha.execute(SITE_KEY, { action: 'contacto' }).then(function(getToken) {
                    fields.token = getToken;
                    sendForm(fields);
                });
            });
        }
    }
    const sendForm = (fields) => {
        fetch (ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            //console.log(response)
            if (!response.ok) {
                return response.json().then(err => {
                    throw err;
                });
            }
            return response.json()
        })
        .then(data => {
            //console.log(data)
            toast.success('Gracias por consultar, te responderemos a la brevedad')
            resetForm()
        })
        .catch(error => {
            //console.error(error)
            if (error.errors) {
                const formErrors = error.errors;
                for (let field in formErrors) {
                    if (formErrors.hasOwnProperty(field)) {
                        toast.warning(formErrors[field]);
                        break; // Detener el bucle después de mostrar el primer mensaje de error
                    }
                }
            }else if(error.message){
                toast.error(error.message)
            }
            //toast.error('No se pudo enviar el mensaje vuelva a intentarlo más tarde.')
        })
        .finally(() => {
            setIsSending(false);
        })
    }
    return(
        <section className="mt-32 md:mt-56 lg:mt-56 pb-40">
            <div className="mb-12">
                <h2 className="text-white text-center uppercase text-3xl sm:text-5xl mx-4">
                    Comunicate con nosotros
                </h2>
            </div>
            <form onSubmit={handleSubmit} method="post" id="contactForm" className="max-md:px-6 grid grid-cols-1 gap-4 mx-auto max-w-(--breakpoint-md) sm:grid-cols-2">
                <Toaster richColors position="top-right" />
                <div className="sm:col-span-2">
                    <input
                        type="text"
                        name="name"
                        className="block bg-transparent text-amarillo placeholder:text-gray-100 font-semibold p-3 w-full text-base border-2 border-white focus:ring-amarillo focus:border-amarillo"
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="phone"
                        className="block bg-transparent text-amarillo placeholder:text-gray-100 font-semibold p-3 w-full text-base border-2 border-white focus:ring-amarillo focus:border-amarillo"
                        placeholder="Teléfono"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        className="block bg-transparent text-amarillo placeholder:text-gray-100 font-semibold p-3 w-full text-base border-2 border-white focus:ring-amarillo focus:border-amarillo"
                        placeholder="E-mail"
                    />
                </div>
                
                <div className="sm:col-span-2">
                    <textarea
                        name="message"
                        rows="6"
                        className="block bg-transparent text-amarillo placeholder:text-gray-100 font-semibold p-3 w-full text-base border-2 border-white focus:ring-amarillo focus:border-amarillo"
                        placeholder="Mensaje"
                        required></textarea>
                </div>
                <div className="sm:col-span-2 flex flex-row justify-end mt-4">
                    <button disabled={isSending} type="submit" className=" w-max disabled:bg-gray-400 bg-amarillo text-gris-cemento font-medium uppercase py-2 px-6 text-lg hover:font-bold hover:bg-amarillo/90">{isSending ? 'Enviando...' : 'Enviar'}</button>
                </div>
            </form>
        </section>
    )
}