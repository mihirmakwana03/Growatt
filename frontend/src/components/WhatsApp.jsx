import React from 'react'
import { useEffect } from 'react';

const WhatsApp = () => {
    useEffect(() => {
        const script = document.createElement('script');
        // script.src = 'https://scripts.getwidget.com/whatsapp.js';
        script.src = './assets/whatsapp.js';
        script.async = true;
        script.onload = () => {
            window.initWhatsAppWidget({
                phoneNumber: "+918155808720",
                name: "Growatt InfoSystem",
                status: "Online",
                avatar: "./assets/title-logo.png",
                welcomeMessage: "Hello, I have visited your website and am interested in your services. Could you please provide me with more information?",
                buttonText: "Send Message",
                autoOpen : false
            });

        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="whatsapp-widget"></div>;
};

export default WhatsApp;
