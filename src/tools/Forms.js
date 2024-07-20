
function process(event){
    const form = event.target;
            const formElements = form.elements;
    
            const newFormData = {};
    
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                if (element.name) {
                    if(element.value != null && element.value != ''){

                        newFormData[element.name] = element.value;

                    }
            }
    }
    return newFormData
}

export default {process}