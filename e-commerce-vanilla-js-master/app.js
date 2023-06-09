let bookList=[];

const toggleModal=()=>{/*sepet ekranının gelip gitmesi için düzenleme*/
    const basketModalEl=document.querySelector(".basket_modal");
    basketModalEl.classList.toggle("active");/*sepeti kapatıp açmak için yaptık*/
};

/*kitap çağırma*/
const getBooks=()=>{/*kitapları jsondan çağıracağız burada*/
    fetch("./products.json")
    .then(res=>res.json())
    .then((books)=>(bookList=books));
};

getBooks();

const createBookStars= (starRate) => {
    let starRateHtml="";
    for(let i=1;i<=5;i++){
        if(Math.round(starRate)>=i) 
        starRateHtml+=`<i class="bi bi-star-fill active"></i> `;
        else starRate+=`<i class="bi bi-star-fill"></i>`;
    }
    return starRateHtml
};

const createBookItemsHtml=()=>{
    const bookListEl=document.querySelector(".book_list");
    let bookListHtml="";
    bookList.forEach((book, index)=>{
        bookListHtml+=`<div class="col-5 ${index%2==0 && "offset-2"} my-5">
        <div class="row book_card">
          <div class="col-6">
            <img 
              class="img-fluid shadow" 
              src="${book.imgSource}" 
              width="258" 
              height="400" />
          </div>
          <div class="col-6 d-flex flex-column justify-content-between;">
            <div classs="book_detail">
              <span class="fos gray fs-5">${book.author}</span><br></br>
              <span class="fs-4 fw-bold">${book.name}</span><br></br>
              <span class="book_star-rate">
                ${createBookStars(book.starRate)}
                <span class="gray">${book.reviewCount}</span>
              </span>
            </div>
              <p class="book_description fos gray">
              ${book.description}
              </p>
            <div>
              <br></br>
              <span class="black fw-bold fs-4 me-2">${book.price}tl</span>
              ${book.oldPrice ? 
                `<span class="fs-4 fw-bold old_price">${book.oldPrice}tl</span>`
                :""
            }
            </div><br></br>
            <button class="btn_purple">ADD BASKET</button>
          </div>
        </div>
      </div>`;

    });

    bookListEl.innerHTML=bookListHtml;
};

const book_types={
    ALL:"Tümü",
    NOVEL:"Roman",
    CHILDREN:"Çocuk",
    SELFIMPROVEMENT:"Kişisel Gelişim",
    HISTORY:"Tarih",
    FINANCE:"Finans",
    SCIENCE:"Bilim",
};

const createBookTypesHtml=()=>{
    const filterEl=document.querySelector(".filter");
    let filterHtml="";
    let filterTypes=["ALL"];
    bookList.forEach(book=>{
        if(filterTypes.findIndex(filter => filter == book.type) == -1) 
        filterTypes.push(book.type);
    });

    filterTypes.forEach((type,index)=>{
        filterHtml+=`<li class="${index==0 ? "active": null}" onclick="filterBooks(this)" data-type="${type}">
        ${book_types[type]||type}</li>`
    });

    filterEl.innerHTML=filterHtml;
};

const filterBooks=(filterEl)=>{
    document.querySelector(".filter .active").classList.remove("active");
    filterEl.classList.add("active");
    let bookType=filterEl.dataset.type;
    getBooks();
    if( bookType != "ALL")
    bookList=bookList.filter((book)=>book.type==bookType);
    createBookItemsHtml();
};

setTimeout(()=>{
    createBookItemsHtml();
    createBookTypesHtml();
},100);