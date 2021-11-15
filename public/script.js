const units = ['g', 'Nb', 'tbsp', 'cl']

document.addEventListener('DOMContentLoaded', function(){

    let type = document.querySelector('#type');
    type.addEventListener('change', () => {
        //Getting all registered ingredients
        const ingredient_by_type = ingredients.filter(itemInArray => itemInArray.category === type.value)

        //Remove the list of ingredients of the option, to change to another option
        let ingredient_options = type.parentNode.querySelector('#ingredient');
        ingredient_options.remove();

        let new_ingredient = document.createElement('div');
        new_ingredient.id = 'ingredient';

        //Foreach ingredients of the type selected, adding an option for this ingredient
        ingredient_by_type.forEach(element => {
            let item = document.createElement('button');
            item.class = 'item';

            //Cannot add Event listener normally on dynamically created element
            //So added it during the creation of the element
            item.addEventListener('click', () => {
                //Select the list of checked ingredients
                let items = document.querySelector('#saved_ingredient');

                //If the checkbox is checked, and the item is not already in the saved list
                if (items.querySelector('[id = "' + element.id + '"]') === null) {
                    
                    let container = document.createElement('div');
                    container.id = element.id;

                    let deleter = document.createElement('input');
                    deleter.type = 'radio';

                    let label_name = document.createElement('label');
                    label_name.for = element.name;
                    label_name.textContent = element.name;

                    let hidden_input = document.createElement('input');
                    hidden_input.name = "ingredients"
                    hidden_input.value = element.name;
                    hidden_input.setAttribute("type", "hidden");

                    let quantity = document.createElement('input');
                    quantity.type = 'number';
                    quantity.placeholder = 0;
                    quantity.name = 'quantities';
                    quantity.setAttribute("required", "");

                    let unit = document.createElement('select');
                    units.forEach(unit_element => {
                        unit.options[unit.options.length] = new Option(unit_element, unit_element);
                    })

                    unit.id = 'unit_' + element.name;
                    unit.name = 'units';

                    deleter.addEventListener('change', () => {
                        container.remove(); 
                    });

                    container.appendChild(deleter);
                    container.appendChild(label_name);
                    container.appendChild(hidden_input);
                    container.appendChild(quantity);
                    container.appendChild(unit);

                    items.appendChild(container);
                }
            });
            let label_val = document.createElement('label');
            label_val.for = element.name;
            label_val.textContent = element.name;
            label_val.id = 'label_' + element.name;

            new_ingredient.appendChild(item);
            new_ingredient.appendChild(label_val);
        });
        type.parentNode.appendChild(new_ingredient);
    });
});