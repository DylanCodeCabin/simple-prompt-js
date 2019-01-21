/**
 * Simple Prompt
 * - A simple class to help creat prompt on the go
 * - See example file for demo on how to use this class
*/
class SimplePrompt {

    /**
     * Make a popup dialog box
     * title => Title of the dialog box
     * content => Description of event which is about to occur
     * options => Array of output options. each index should be an object with a key and value pair
     *
     * Return Promise
    */
    static popup(title, content, options, container){
        const dialogPromise = new Promise((resolve, reject) => {
            try{
                const id = Date.now();
                let outputOptions = options
                                        .filter((value) => typeof value === 'object' && typeof value.value !== 'undefined' && typeof value.key !== 'undefined')
                                        .map((value, index) => `<div class='item btn' id='item-${id}-${index}' data-item-key='${value.key}'>${value.value}</div>`);

                let dialogHtml = `<div class='dialog' data-dialog-id='${id}'>
                                    <div class='title'>${title}</div>
                                    <hr>
                                    <div class='content'>${content}</div>
                                    <div class='options text-center'>${outputOptions.join('')}</div>
                                 </div>`;

                const dialogContainer = document.createElement("div");
                dialogContainer.classList.add('popup_dialog_container');
                dialogContainer.innerHTML = dialogHtml;

                const mainPanel = document.querySelector(container);
                mainPanel.appendChild(dialogContainer);

                const itemSelectors = document.querySelectorAll(`.dialog[data-dialog-id='${id}'] .options .item`);
                for(let item of itemSelectors){
                    const selectedKey = item.getAttribute('data-item-key');
                    item.addEventListener('click',
                        () => {
                            resolve(selectedKey);
                            dialogContainer.remove();
                        },
                    false);
                }
            } catch (exception){
                reject(exception);
            }
        });

        return dialogPromise;
    }

    /**
     * Make a input dialog box
     * title => Title of the dialog box
     * content => Description of event which is about to occur
     * defaultValue => Default input value (Defaults to empty)
     * confirmLabel => Text for the confirmation label (Defaults to Ok)
     * cancelLabel => Text for the cancel label (Defaults to Cancel)
     *
     * Return Promise
    */
    static input(title, content, defaultValue = "", confirmLabel = "Ok", cancelLabel = "Cancel", container){
        const inputPromise = new Promise((resolve, reject) => {
            try{
                const id = Date.now();
                let outputOptions = `<div class='btn confirm'>${confirmLabel}</div> <div class='btn cancel'>${cancelLabel}</div>`;

                let dialogHtml = `<div class='dialog' data-dialog-id='${id}'>
                                    <div class='title'>${title}</div>
                                    <hr>
                                    <div class='content'>${content}</div>
                                    <input type='text' class='input_field form-control' value='${defaultValue}'>
                                    <div class='options text-center'>${outputOptions}</div>
                                 </div>`;

                const dialogContainer = document.createElement("div");
                dialogContainer.classList.add('popup_dialog_container');
                dialogContainer.innerHTML = dialogHtml;

                const mainPanel = document.querySelector(container);
                mainPanel.appendChild(dialogContainer);

                const cancelBtn = document.querySelector(`.dialog[data-dialog-id='${id}'] .options .cancel`);
                cancelBtn.addEventListener('click',
                    () => {
                        reject();
                        dialogContainer.remove();
                    },
                false);

                const confirmBtn = document.querySelector(`.dialog[data-dialog-id='${id}'] .options .confirm`);
                confirmBtn.addEventListener('click',
                    () => {
                        const inputField = document.querySelector(`.dialog[data-dialog-id='${id}'] .input_field`);
                        resolve(inputField.value);
                        dialogContainer.remove();
                    },
                false);

            } catch (exception){
                reject(exception);
            }
        });

        return inputPromise;
    }
}