import './styles.css'

import Softwares_ico from 'images/svgs/softwares.svg'
import Softwares_img from 'images/softwares.jpg'

import Indicadores_ico from 'images/svgs/indicadores.svg'
import Indicadores_img from 'images/indicadores.jpg'

import chatStyle from './Homepage.module.scss'

export default function Homepage() {
    const webPages = [
        {
            name: 'Softwares',
            link: '/Softwares',
            image: Softwares_img,
            icon: Softwares_ico
        },
        {
            name: 'Indicadores',
            link: 'https://wen-indicators.vercel.app/',
            image: Indicadores_img,
            icon: Indicadores_ico
        },
    ]
    return (
        <>
            <a href='https://pcp-chatbot.vercel.app/'><span className={chatStyle.chat} title='Chatbot do PCP' /></a>
            <h3 style={{ textAlign: 'center', textWrap: 'wrap', paddingBottom: 20 }}>PPC WEN Automation's Database</h3>
            <div className="container">
                {webPages.map((page, index) => (
                    <a href={page.link} className="card" key={index}>
                        <img className="background" src={page.image} alt="" />
                        <div className="card-content">
                            <div className="profile-image">
                                <img src={page.icon} alt="Ícone da página" />
                            </div>
                            <h3 className="title">{page.name}</h3>
                        </div>
                        <div className="backdrop"></div>
                    </a>
                ))}
            </div>
        </>
    )
}