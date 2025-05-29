import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FadeInSection = ({ children }) => {
    const ref = useRef();

    useEffect(() => {
        const el = ref.current;
        gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.6)",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none", // solo una vez
                },
            }
        );
    }, []);

    return <div ref={ref}>{children}</div>;
};

export default FadeInSection;
