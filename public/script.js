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
            item.type = 'button';
            item.className= "btn btn-success btn-sm";
            item.textContent = "+";

            //Cannot add Event listener normally on dynamically created element
            //So added it during the creation of the element
            item.addEventListener('click', () => {
                //Select the list of checked ingredients
                let items = document.querySelector('#saved_ingredient');

                //If the checkbox is checked, and the item is not already in the saved list
                if (items.querySelector('[id = "' + element.id + '"]') === null) {
                    
                    let container = document.createElement('div');
                    container.id = element.id;

                    let deleter = document.createElement('button');
                    deleter.type = 'button';
                    deleter.className= "btn btn-danger btn-sm";
                    deleter.textContent = "-";

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

                    deleter.addEventListener('click', () => {
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


/*
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var dict = [];
        let ingredients = Array.from(document.getElementsByName("ingredients"));
        let amounts = document.getElementsByName("quantities");
        let units = Array.from(document.getElementsByName("units"));

        let i = 0;

        amounts.forEach(quantity => {
            if (quantity.value == "" || !quantity.value.match(/^[0-9]+$/)){
                throw new Error();
            } else {
                dict.push({
                    ingredient: ingredients[i].value,
                    amount: quantity.value,
                    unit: units[i].value
                });
                i = i + 1;
            }
        });

        let dictinput = document.createElement("input");
        dictinput.value = JSON.stringify(dict);
        dictinput.name = "ingredients";
        dictinput.setAttribute("type", "hidden");

        console.log(dictinput.value)

        form.appendChild(dictinput);

        form.submit();
          // Reset all form data
        //return false; // Prevent page refresh
    });
    */
});

function formsubmission(){
    var dict = [];
    let ingredients = Array.from(document.getElementsByName("ingredients"));
    let amounts = document.getElementsByName("quantities");
    let units = Array.from(document.getElementsByName("units"));

    let i = 0;

    amounts.forEach(quantity => {
        if (quantity.value == "" || !quantity.value.match(/^[0-9]+$/)){
            throw new Error();
        } else {
            dict.push({
                ingredient: ingredients[i].value,
                amount: quantity.value,
                unit: units[i].value
            });
            i = i + 1;
        }
    });

    let form = document.querySelector("#form_ingredient")

    let dictinput = document.createElement("input");
    dictinput.value = JSON.stringify(dict);
    dictinput.name = "ingredients";
    dictinput.setAttribute("type", "hidden");

    console.log(dictinput.value)

    form.appendChild(dictinput);

    form.submit();
    form.removeChild(dictinput);
}

