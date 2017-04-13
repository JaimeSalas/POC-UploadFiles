(function (userinterface) {
  userinterface.uiBuilder = (function() {
    const createList = function createList (elements) {
      let list = document.createElement('ul');

      elements.forEach((element) => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(element)); // Use mapper here, to extract and format data.
        list.appendChild(listItem);
      });

      return list;
    };

    const appendElement = function appendElement(target, item) {
      document.getElementById(target).appendChild(item);
    };

    return {
      createList,
      appendElement
    };
  })();
})(userinterface);
