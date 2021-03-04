import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) =>{

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {  
        setIsLoading(true);
        fetch(url)
            .then(response => {
                setIsLoading(false)
                if (!response.ok) throw new Error('Failed.');
                return response.json();
            })
            .then(data => {
                setIsLoading(false)
                setData(data)            
            })
            .catch(err => {
                setIsLoading(false)
                setData([])            
                console.log(err);
            });
    }, dependencies)

    return [isLoading, data]
}