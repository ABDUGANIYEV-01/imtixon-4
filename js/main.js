
// var bookMark = document.getElementById('bookmarktemplete').content
var bookTemplate = document.getElementById('book-template').content

var ulEl = document.getElementById('bookul')
var bookListEl = document.getElementById('book-list')
var inputEL = document.getElementById('search')
var serchform = document.getElementById('search-form')
var loaderEL = document.querySelector('#loader')



const API = 'https://www.googleapis.com/books/v1/volumes?q='


async function getBooks( items = "kelli" ,  pageNumber = 1 ){
   let response =  await fetch(`${API}=items&s=${items}&page${pageNumber}`)
  
   response = await response.json()
    return response
}

serchform.addEventListener('submit', event =>{
    event.preventDefault()
    renderBooks(ulEl)
})

window.addEventListener('load', () =>{
    loaderEL.classList.remove('loader__show')
})
let currentPage = 1
var paginationEL = document.querySelector('.pagination')
var paginationNextRL = document.querySelector('#next-btn')
var paginationPrevRL = document.querySelector('#prev-btn')
paginationNextRL.addEventListener('click', event => {
    if(!isNaN(Number(event.target.dataset.pageId))){
        renderBooks(ulEl, event.target.dataset.pageId)
        currentPage++
    }
})

paginationPrevRL.addEventListener('click', event => {
    if(!isNaN(Number(event.target.dataset.pageId))){
        renderBooks(ulEl, event.target.dataset.pageId)
        currentPage--
    }
})


async function renderBooks( node , page =1 ){
    loaderEL.classList.add('loader__show')
    let response
    try{
        response = (await getBooks(inputEL.value ,page))
        console.log(response)
    }catch (error){
        console.log(error);
    }
  
 
  const books = response.items
  let maxLength = response.totalItems
    node.innerHTML = null

    let booksListFragment = document.createDocumentFragment()
    books.forEach(element => {
                let bookItemEL = document.importNode(bookTemplate , true)
                // bookItemEL.getElementById('book-img').src = element.readingModes.image
                // let cardImgEl = bookItemEL.querySelector('#book-img')
                // cardImgEl.setAttribute('src',element.imageLinks.smallThumbnail)
                bookItemEL.querySelector('.books__date').textContent = element.volumeInfo.publishedDate
                bookItemEL.querySelector('.books__autor').textContent = element.volumeInfo.authors
                bookItemEL.querySelector('.books__name').textContent = element.volumeInfo.title
                bookItemEL.querySelector('.toggle__deck').textContent = element.volumeInfo.description
               bookItemEL.querySelector('#publisher').textContent = element.volumeInfo.publisher
               bookItemEL.querySelector('#categories').textContent = element.volumeInfo.categories
               bookItemEL.querySelector('#publishedDate').textContent = element.volumeInfo.publishedDate
                bookItemEL.querySelector('#authors').textContent = element.volumeInfo.authors
                bookItemEL.querySelector('#pageCount').textContent = element.volumeInfo.pageCount
        
        
        
                var toggle = bookItemEL.querySelector('#toggle')
                var navbar = bookItemEL.querySelector('#navbar')
        
                toggle.addEventListener('click', () => {
                    navbar.classList.toggle('navbar__active')
                })
        
                navbar.addEventListener('click', () => {
                    navbar.classList.remove('navbar__active')
        })
                booksListFragment.appendChild(bookItemEL)
            })


            if(currentPage <=1){
                let prevLink = paginationPrevRL.querySelector('div.page-link')
                prevLink.dataset.pageId = null
                let nextLink = paginationNextRL.querySelector('div.page-link')
                nextLink.dataset.pageId = currentPage+1   
                console.log(currentPage, 'changed') 
            }else if(currentPage > maxLength/10){
                let prevLink = paginationPrevRL.querySelector('div.page-link')
                prevLink.dataset.pageId = currentPage-1 
                let nextLink = paginationNextRL.querySelector('div.page-link')
                nextLink.dataset.pageId = null       
            }else{
                let prevLink = paginationPrevRL.querySelector('div.page-link')
                prevLink.dataset.pageId = currentPage-1
                let nextLink = paginationNextRL.querySelector('div.page-link')
                nextLink.dataset.pageId = currentPage+1
            }

    node.appendChild(booksListFragment)
    

 loaderEL.classList.remove('loader__show')
}




    function showLoader(){
        let cloneLoader = document.importNode (loaderEL,true)
        console.log(cloneLoader);
    }
renderBooks(ulEl)

// var bookMark = document.querySelector('.books__item__mark')

// bookMark.addEventListener('click', event =>{
//     event.preventDefault()
//     let bookmarkFragment = document.createDocumentFragment()
//   return item.reduce(element => {
//        let  item = document.importNode(bookMarktemo , true)
//        item.querySelector('.bkauthor').textContent = element.volumeInfo.authors

//        bookmarkFragment.appendChild(item)
//    })
   

      
// })
//  return reduce(bookMark)