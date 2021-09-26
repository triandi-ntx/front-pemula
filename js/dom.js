const INCOMPLETE_BOOKSHELF_LIST_ID = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST_ID = "completeBookshelfList";
const BOOKSHELF_BOOK_ID = "bookId";

const addBook = () => {
    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookIsComplete = document.getElementById("inputBookIsComplete").checked;
    
    const book = makeBook(bookTitle, bookAuthor, bookYear, bookIsComplete);
    const bookshelfObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookIsComplete);

    book[BOOKSHELF_BOOK_ID] = bookshelfObject.id;
    bookshelf.push(bookshelfObject);

    if (bookIsComplete) {
        completeBookshelfList.append(book);
    } else {
        incompleteBookshelfList.append(book);
    }

    updateDataToStorage();
}

const makeBook = (bookTitle, bookAuthor, bookYear, bookIsComplete) => {
    const textTitle = document.createElement("h3");
    textTitle.innerText = bookTitle;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerText = bookAuthor;

    const textYear = document.createElement("p");
    textYear.classList.add("year");
    textYear.innerText = bookYear;

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("action");
    
    if (bookIsComplete) {
        containerDiv.append(createUndoButton(), createDeleteButton());
    } else {
        containerDiv.append(createCompleteButton(), createDeleteButton());
    }

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(textTitle, textAuthor, textYear, containerDiv);

    return container;
}

const createButton = (buttonTypeClass, buttonInnerText, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonInnerText;

    button.addEventListener("click", (event) => {
        eventListener(event);
    });

    return button;
}

const addBookToComplete = (taskElement) => {
    const listCompleted = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);
    const textTitle = taskElement.querySelector(".book_item > h3").innerText;
    const textAuthor = taskElement.querySelector(".author").innerText;
    const textYear = taskElement.querySelector(".year").innerText;

    const newBook = makeBook(textTitle, textAuthor, textYear, true);
    const book = findBook(taskElement[BOOKSHELF_BOOK_ID]);
    book.bookIsComplete = true;
    newBook[BOOKSHELF_BOOK_ID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

const removeBook = (taskElement) => {
    if ((confirm("Apakah Anda yakin?") === true)) {
        const bookPosition = findBookIndex(taskElement[BOOKSHELF_BOOK_ID]);
        bookshelf.splice(bookPosition, 1);
        
        taskElement.remove();
    }

    updateDataToStorage();
}

const undoBookFromComplete = (taskElement) => {
    const listIncompleted = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const textTitle = taskElement.querySelector(".book_item > h3").innerText;
    const textAuthor = taskElement.querySelector(".author").innerText;
    const textYear = taskElement.querySelector(".year").innerText;

    const newBook = makeBook(textTitle, textAuthor, textYear, false);
    const book = findBook(taskElement[BOOKSHELF_BOOK_ID]);
    book.bookIsComplete = false;
    newBook[BOOKSHELF_BOOK_ID] = book.id;

    listIncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}


const createCompleteButton = () => {
    return createButton("green", "Selesai dibaca", (event) => {
        addBookToComplete(event.target.parentElement.parentElement);
    });

}


const createDeleteButton = () => {
    return createButton("red", "Hapus buku", (event) => {
        removeBook(event.target.parentElement.parentElement);
    });
}


const createUndoButton = () => {
    return createButton("green", "Belum selesai dibaca", (event) => {
        undoBookFromComplete(event.target.parentElement.parentElement);
    });
}


const searchBook = () => {
    const inputSearchBook = document.getElementById("searchBookTitle");
    const searchBook = inputSearchBook.value.toLowerCase();
    const books = document.querySelectorAll(".book_item");
    
    Array.from(books).forEach((book) => {
        const textTitle = book.firstElementChild.textContent;
        if (textTitle.toLowerCase().indexOf(searchBook) != -1) {
            book.style.display = "block";
        }
         else 
         {
            book.style.display = "none";
        }
    });
}