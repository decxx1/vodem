import { useState,useEffect } from 'react';

export default function Menu() {
    const [path, setPath] = useState(null);

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    const classMenu = (value) => {
        if (value === path) {
            return 'font-bold ';
        } else {
            return 'font-normal ';
        }
        
    }
    return(
        <>
            <ul className="flex flex-col md:flex-row max-md:text-center gap-4 text-gris-cemento font-normal">
                <li>
                    <a className={classMenu('/') + "uppercase text-lg md:text-xl lg:text-2xl hover:font-bold"} href="/">
                        Inicio
                    </a>
                </li>
                <li className="px-2 max-md:hidden">|</li>
                <li>
                    <a className={classMenu('/empresa') +"uppercase text-lg md:text-xl lg:text-2xl hover:font-bold"} href="/empresa">
                        Empresa
                    </a>
                </li>
                <li className="px-2 max-md:hidden">|</li>
                <li>
                    <a className={classMenu('/servicios') +"uppercase text-lg md:text-xl lg:text-2xl hover:font-bold"} href="/servicios">
                        Servicios
                    </a>
                </li>
                <li className="px-2 max-md:hidden">|</li>
                <li>
                    <a className={classMenu('/proyectos') +"uppercase text-lg md:text-xl lg:text-2xl hover:font-bold"} href="/proyectos">
                        Proyectos
                    </a>
                </li>
                <li className="px-2 max-md:hidden">|</li>
                <li>
                    <a className={classMenu('/contacto') +"uppercase text-lg md:text-xl lg:text-2xl hover:font-bold"} href="/contacto">
                        Contacto
                    </a>
                </li>
            </ul>
        </>
    )
}