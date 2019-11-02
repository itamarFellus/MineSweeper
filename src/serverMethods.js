class serverMethods {
    getData(str) {
        return fetch('/site', {
            method: 'POST' ,
            credentials: 'include' ,
            headers: {
                Accept: 'application/json' ,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ str })
        }).then(res => res.json());
    }
}

export default new serverMethods();