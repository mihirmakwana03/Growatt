import { useEffect } from 'react';

const GoogleReviewsWidget = () => {
    useEffect(() => {
        // Check if the script isn't already added
        const scriptId = 'elfsight-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = "https://static.elfsight.com/platform/platform.js";
            script.async = true;
            document.body.appendChild(script);
        }

        // Cleanup if necessary (remove the script when component unmounts)
        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="elfsight-app-4680cb2e-64ca-4df9-9b5e-5f0859cf069d" data-elfsight-app-lazy></div>
    );
};

export { GoogleReviewsWidget };
