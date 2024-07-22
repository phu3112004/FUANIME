import { forwardRef, useState } from 'react';
import images from '../../assest/images';

const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    if (!src) {
        setFallBack(images.noImage);
    }
    const handleError = () => {
        setFallBack(images.noImage);
    };
    return <img className={className} ref={ref} src={fallBack || src} alt={alt} {...props} onError={handleError} />;
});

export default Image;
