// Fetching product data
const fetchProductData = async () => {
    const response = await fetch('products.json');
    return response.json();
};

const renderProductList = async () => {
    const products = await fetchProductData();
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredProducts = Object.entries(products); 

   
    const renderPage = (page) => {
        productList.innerHTML = ''; 
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filteredProducts.slice(startIndex, endIndex).forEach(([id, product]) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item1';
            productDiv.innerHTML = `
                <a href="product.html?id=${id}" class="block w-full h-full relative">
                    <img src=${product.ImgUrl} alt="" class="w-full h-full object-cover">
                    <h3 class="titlename absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">${product.name}</h3>
                </a>
            `;
            productList.appendChild(productDiv);
        });

        renderPagination(page);
    };

    const renderPagination = (page) => {
        pagination.innerHTML = ''; 
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
        // "Previous" button
        const prevButton = document.createElement('button');
        prevButton.textContent = '← Previous';
        prevButton.className = 'pagination-button prev-button'; // Added classes
        prevButton.disabled = page === 1; 
        prevButton.addEventListener('click', () => {
            currentPage = Math.max(1, currentPage - 1);
            renderPage(currentPage);
        });
        pagination.appendChild(prevButton);
    
        // Number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = `pagination-button page-number ${i === page ? 'active' : ''}`; // Added classes
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderPage(currentPage);
            });
            pagination.appendChild(pageButton);
        }
    
        // "Next" button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next →';
        nextButton.className = 'pagination-button next-button'; // Added classes
        nextButton.disabled = page === totalPages; 
        nextButton.addEventListener('click', () => {
            currentPage = Math.min(totalPages, currentPage + 1);
            renderPage(currentPage);
        });
        pagination.appendChild(nextButton);
    };
    

    const filterProducts = () => {
        const query = searchInput.value.toLowerCase();
        filteredProducts = Object.entries(products).filter(([id, product]) =>
            product.name.toLowerCase().includes(query)
        );
        currentPage = 1; 
        renderPage(currentPage);
    };

    searchInput.addEventListener('input', filterProducts);

    renderPage(currentPage);
};
// product page scroller 
const productpagescroller = async () => {
    const productlistinproduct = await fetchProductData();
    let box = "";

    productlistinproduct.forEach((product, index) => {
        const productNumber = index + 0; 

        box += `
            <a href="product.html?id=${productNumber}" class="card bg-white shadow-lg rounded-lg overflow-hidden inline-block">
                <img src="${product.ImgUrl}" alt="Megatech" class="w-full h-44 object-cover"/>
                <div class="p-4 text-center">
                    <p class="text-gray-700 font-medium "> ${product.name}</p>
                </div>
            </a>
        `;
    });

    document.querySelector('.productpagescroller').innerHTML = box;
};

productpagescroller();


//  Product Details will be there in product.html
const renderProductDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const products = await fetchProductData();

    const product = products[productId];
   if (product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-name-title').textContent = product.name;

  document.getElementById('product-name-desc').textContent = product.description;
  document.getElementById('SrNo').textContent = product.Srno;
  document.getElementById('product-price').textContent = product.ProductCode;
  document.getElementById('category').textContent = product.Category;
  document.getElementById('subcategory').textContent = product.SubCategory;
  document.getElementById('Wattage').textContent = product.Wattage;
  document.getElementById('CCT').textContent = product.cct;
  document.getElementById('LUMEN').textContent = product.maxlumen;
  document.getElementById('led').textContent = product.led;
  document.getElementById('rating').textContent = product.rating;
  document.getElementById('beam').textContent = product.beam;
  document.getElementById('driver').textContent = product.driver;
  document.getElementById('housematerial').textContent = product.housing;

  document.getElementById('ColourTemp').innerHTML = `
    ${product.ColourTemp || ''}
    <span class="inline-block w-5 h-5 rounded-full border-2 border-black ml-2" style="background-color: #F4A623;"></span>
    <span class="inline-block w-5 h-5 rounded-full border-2 border-black ml-2" style="background-color: #F8E71C;"></span>
    <span class="inline-block w-5 h-5 rounded-full border-2 border-black ml-2" style="background-color: #D8ECFF;"></span>
  `;

  // Reflector
  if (product.Reflector && product.Reflector.trim() !== "") {
    document.getElementById('Reflector').textContent = product.Reflector;
    document.getElementById('ReflectorContainer').style.display = 'flex';
  } else {
    document.getElementById('ReflectorContainer').style.display = 'none';
  }

  // Ring Colour
  if (product.RingColour && product.RingColour.trim() !== "") {
    document.getElementById('RingColour').textContent = product.RingColour;
    document.getElementById('RingColourContainer').style.display = 'flex';
  } else {
    document.getElementById('RingColourContainer').style.display = 'none';
  }

  // Heatsink Colour
  if (product.HeatsinkColour && product.HeatsinkColour.trim() !== "") {
    document.getElementById('HeatsinkColour').textContent = product.HeatsinkColour;
    document.getElementById('HeatsinkColourContainer').style.display = 'flex';
  } else {
    document.getElementById('HeatsinkColourContainer').style.display = 'none';
  }

  document.getElementById('product-image').src = product.ImgUrl;

  // Set gallery images
  const galleryContainer = document.getElementById('product-gallery');
  galleryContainer.innerHTML = '';

  if (product.galleryimg && Array.isArray(product.galleryimg)) {
    product.galleryimg.forEach((imageSrc) => {
      const thumb = document.createElement('img');
      thumb.src = imageSrc;
      thumb.className = "w-20 h-20 rounded-lg object-cover cursor-pointer border-2 border-transparent hover:border-[#7a1c1c] transition snap-start will-change-transform";
      thumb.addEventListener('click', () => {
        document.getElementById('product-image').src = imageSrc;
      });
      galleryContainer.appendChild(thumb);
    });
  } else {
    document.getElementById('product-name').textContent = "Product not found!";
  }
}
     
};


if (document.getElementById('product-list')) {
    renderProductList();
} else if (document.getElementById('product-name')) {
    renderProductDetails();
}



let categoryDropdownPopulated = false;
let subcategoryDropdown;

const renderCategoryProducts = async (selectedCategory = '', selectedSubcategory = '') => {
    try {
        const products = await fetchProductData();

        const productContainer = document.getElementById('product-list');
        const paginationContainer = document.getElementById('pagination');
        const searchInput = document.getElementById('search-input');
        const categoryDropdown = document.querySelector('.category-dropdown');

        if (!productContainer || !paginationContainer || !categoryDropdown) return;

        // Create or reference the subcategory dropdown
        if (!subcategoryDropdown) {
            subcategoryDropdown = document.createElement('select');
            subcategoryDropdown.className = 'subcategory-dropdown h-10 p-2 mt-6 border rounded category-dropdown overflow-hidden'; // Added styles here
            subcategoryDropdown.style.display = 'none';
            categoryDropdown.parentNode.insertBefore(subcategoryDropdown, categoryDropdown.nextSibling);
        }

        // Populate category dropdown once
        if (!categoryDropdownPopulated) {
            categoryDropdown.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'All Categories';
            categoryDropdown.appendChild(defaultOption);

            const uniqueCategories = [...new Set(Object.values(products).map(p => p.Category).filter(Boolean))];
            uniqueCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                option.classList.add('text-sm');
                categoryDropdown.appendChild(option);
            });

            categoryDropdownPopulated = true;

            categoryDropdown.addEventListener('change', () => {
                const newCategory = categoryDropdown.value;
                renderCategoryProducts(newCategory, ''); // Reset subcategory when category changes
            });
        }

        // Filter by selected category and subcategory
        let filteredProducts = Object.entries(products).filter(([_, product]) => {
            const categoryMatch = !selectedCategory || product.Category?.toLowerCase() === selectedCategory.toLowerCase();
            const subcategoryMatch = !selectedSubcategory || product.SubCategory?.toLowerCase() === selectedSubcategory.toLowerCase();
            return categoryMatch && subcategoryMatch;
        });

        // Handle subcategory dropdown population if category is selected
        if (selectedCategory) {
            const relatedSubcategories = [...new Set(Object.values(products)
                .filter(p => p.Category?.toLowerCase() === selectedCategory.toLowerCase())
                .map(p => p.SubCategory).filter(Boolean))];

            if (relatedSubcategories.length > 0) {
                subcategoryDropdown.style.display = 'block';
                subcategoryDropdown.innerHTML = '';

                // Add the default "All Subcategories" option
                const defaultSubOption = document.createElement('option');
                defaultSubOption.value = '';
                defaultSubOption.textContent = 'All SubCategories';
                subcategoryDropdown.appendChild(defaultSubOption);

                // Add the available subcategory options
                relatedSubcategories.forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub;
                    option.textContent = sub;
                    subcategoryDropdown.appendChild(option);
                });

                // Set the subcategory dropdown's selected value
                subcategoryDropdown.value = selectedSubcategory || '';

                // When subcategory is selected, update the products
                subcategoryDropdown.onchange = () => {
                    renderCategoryProducts(selectedCategory, subcategoryDropdown.value);
                };
            } else {
                subcategoryDropdown.style.display = 'none';
            }
        } else {
            subcategoryDropdown.style.display = 'none';
        }

        let currentPage = 1;
        const productsPerPage = 8;

        const renderPage = (page) => {
            productContainer.innerHTML = '';
            const start = (page - 1) * productsPerPage;
            const end = start + productsPerPage;
            const pageProducts = filteredProducts.slice(start, end);

            if (pageProducts.length === 0) {
                productContainer.innerHTML = `<p class="no-products">No products found.</p>`;
                return;
            }

            pageProducts.forEach(([id, product]) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-item1';
                productDiv.innerHTML = `
                    <a href="product.html?id=${id}">
                        <img src="${product.ImgUrl}" alt="${product.name}">
                        <h3 class="titlename">${product.name}</h3>
                        <p class="price">${product.price || ''}</p>
                    </a>
                `;
                productContainer.appendChild(productDiv);
            });

            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            paginationContainer.innerHTML = '';

            if (totalPages > 1) {
                const prevButton = document.createElement('button');
                prevButton.textContent = '← Previous';
                prevButton.disabled = page === 1;
                prevButton.className = 'pagination-button';
                prevButton.addEventListener('click', () => {
                    currentPage--;
                    renderPage(currentPage);
                });
                paginationContainer.appendChild(prevButton);

                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.textContent = i;
                    pageButton.className = 'pagination-button';
                    if (i === page) pageButton.classList.add('active');
                    pageButton.addEventListener('click', () => {
                        currentPage = i;
                        renderPage(currentPage);
                    });
                    paginationContainer.appendChild(pageButton);
                }

                const nextButton = document.createElement('button');
                nextButton.textContent = 'Next →';
                nextButton.disabled = page === totalPages;
                nextButton.className = 'pagination-button';
                nextButton.addEventListener('click', () => {
                    currentPage++;
                    renderPage(currentPage);
                });
                paginationContainer.appendChild(nextButton);
            }
        };

        if (searchInput && !searchInput.dataset.listenerAdded) {
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                filteredProducts = Object.entries(products).filter(([_, product]) => {
                    const matchesCategory = !selectedCategory || product.Category?.toLowerCase() === selectedCategory.toLowerCase();
                    const matchesSubCategory = !selectedSubcategory || product.SubCategory?.toLowerCase() === selectedSubcategory.toLowerCase();
                    const matchesName = product.name.toLowerCase().includes(query);
                    return matchesCategory && matchesSubCategory && matchesName;
                });
                currentPage = 1;
                renderPage(currentPage);
            });
            searchInput.dataset.listenerAdded = "true";
        }

        renderPage(currentPage);

    } catch (error) {
        console.error('Error rendering category products:', error);
    }
};

renderCategoryProducts();


renderProductList();
// Product Scroller
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.product-track');
    const slides = document.querySelectorAll('.product-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    // Clone slides for infinite scroll
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth;
    let autoScrollInterval;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function moveToNextSlide() {
        currentIndex++;
        track.style.transition = 'transform 0.5s ease-in-out';
        updateSlidePosition();

        // Reset to start when reaching the end
        if (currentIndex >= slides.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                updateSlidePosition();
            }, 500);
        }
    }

    function moveToPrevSlide() {
        currentIndex--;
        track.style.transition = 'transform 0.5s ease-in-out';
        updateSlidePosition();

        // Reset to end when reaching the start
        if (currentIndex < 0) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = slides.length - 1;
                updateSlidePosition();
            }, 500);
        }
    }

    // Auto scroll
    function startAutoScroll() {
        autoScrollInterval = setInterval(moveToNextSlide, 4000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        moveToNextSlide();
        startAutoScroll();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        moveToPrevSlide();
        startAutoScroll();
    });

    // Pause auto scroll on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Start auto scroll
    startAutoScroll();

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});












document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 100
    });
});








const lamp = document.getElementById('tall');
const wrapper = document.getElementById('wrapper');
const overlay = document.getElementById('overlay');

//  overlay on page load
window.addEventListener('load', function() {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    lamp.classList.add('light-off');
    setTimeout(() => {
        overlay.style.opacity = "0";
            overlay.style.visibility = "hidden";
            lamp.classList.remove('light-off');
       
    }, 2000);
});

// Toggle overlay on lamp click
lamp.addEventListener('click', function() {
    if (overlay.style.visibility === "hidden" || overlay.style.opacity === "0") {
        overlay.style.visibility = "visible";
        overlay.style.opacity = "1";
    lamp.classList.add('light-off');

    } else {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.visibility = "hidden";
            lamp.classList.remove('light-off');

        }, 100);
    }
});
    const swiper = new Swiper('.swiper-container', {
slidesPerView: 1, 
spaceBetween: 10,
pagination: {
  el: '.swiper-pagination',
  clickable: true,
},
navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
},
breakpoints: {

  320: {
    slidesPerView: 1,
  },

  640: {
    slidesPerView: 1,
  },

  1024: {
    slidesPerView: 2,
  },

},
});



// back to top 
const swiperk = new Swiper(".exploreSwiper", {
    loop: true,
    slidesPerView: 2, // Default for mobile
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3, // Desktop
      },
    },
  });
  
  const swiperkd = new Swiper('.exploreSwiperhome', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  
  

