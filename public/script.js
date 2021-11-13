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
            let item = document.createElement('input');
            item.type = 'checkbox';
            item.class = 'item';

            //Cannot add Event listener normally on dynamically created element
            //So added it during the creation of the element
            item.addEventListener('change', () => {
                //Select the list of checked ingredients
                let items = document.querySelector('#saved_ingredient');

                //If the checkbox is checked, and the item is not already in the saved list
                if (item.checked && items.querySelector('#saved_' + element.name) === null) {
                    let container = document.createElement('div');

                    let deleter = document.createElement('input');
                    deleter.type = 'radio';
                    deleter.id = 'saved_' + element.name;
                    
                    //saved_item.class = 'saved_items';

                    let label_saved_item = document.createElement('label');
                    label_saved_item.for = element.name;
                    label_saved_item.textContent = element.name;

                    let quantity = document.createElement('input');
                    quantity.type = 'number';
                    quantity.id = element.name;
                    //quantity.id = 'quantity_' + element;
                    quantity.placeholder = 'Quantity';
                    quantity.name = 'saved_items';
                    quantity.setAttribute("required", "");

                    let unit = document.createElement('select');
                    unit.options[unit.options.length] = new Option('g', 'g');
                    unit.options[unit.options.length] = new Option('Numbers', '');
                    unit.id = 'unit_' + element.name;
                    unit.name = 'units';

                    deleter.addEventListener('change', () => {
                        container.remove(); 
                    });

                    container.appendChild(deleter);
                    container.appendChild(label_saved_item);
                    container.appendChild(quantity);
                    container.appendChild(unit);

                    items.appendChild(container);
                }
            });
            let label_val = document.createElement('label');
            label_val.for = element;
            label_val.textContent = element.name;
            label_val.id = 'label_' + element.name;

            new_ingredient.appendChild(item);
            new_ingredient.appendChild(label_val);
        });
        type.parentNode.appendChild(new_ingredient);
    });
})