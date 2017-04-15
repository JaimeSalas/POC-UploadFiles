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

    const populateUsersTable = function populateUsersTable(users) {
      let tbody = document.querySelector('#users > tbody');
      users.forEach((user, index) => {
        const row = getRow(user);
        appendCells(getCells(user), row);
        tbody.appendChild(row);
      });
    }

    const getRow = (user) => {
      let row = document.createElement('tr');
      row.setAttribute('data-user-id', user._id);
      return row;
    };

    const getCells = (user) => {
      let cells = [];
      cells.push(createCell(user.name));
      cells.push(createCell(user.lastName));
      return cells;
    };

    const appendCells = (cells, row) => 
      cells.forEach((val) => row.appendChild(val)); 

    const createCell = (text) => {
      let cell = document.createElement('td');
      const textCell = document.createTextNode(text);
      cell.appendChild(textCell)
      return cell;
    };

    const fillElementText = (id, text) => {
      document.getElementById(id).innerText = text;
    };

    return {
      createList,
      appendElement,
      populateUsersTable,
      fillElementText
    };
  })();
})(userinterface);
