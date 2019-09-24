import { useEffect, useRef } from 'react';
import { autorun } from 'mobx';

export default function useAutoRun(autoRunFunc, debounce = 0) {
    useEffect(() => {
        return autorun(autoRunFunc, { delay: debounce });
    }, []);
};