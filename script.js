$(document).ready(function () {
  // Redirect if not logged in
  if (!localStorage.getItem('loggedIn') && location.pathname.includes('shop')) {
    window.location.href = 'index.html';
  }

  // Logout button
  $('#logoutBtn').click(function () {
    localStorage.clear();
    window.location.href = 'index.html';
  });

  // Load products
  if ($('#gallery').length) {
    $.ajax({
      url: 'http://localhost:8080/api/images',
      method: 'GET',
      success: function (data) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        data.forEach((path, index) => {
          $('#gallery').append(`
            <div class="col-md-3 text-center">
              <img src="${path}" class="img-fluid rounded shadow mb-2" />
              <button class="btn btn-warning add-to-cart" data-index="${index}">Add to Cart</button>
            </div>
          `);
        });

        $('#cartCount').text(cart.length);

        $('.add-to-cart').click(function () {
          const product = $(this).prev('img').attr('src');
          cart.push(product);
          localStorage.setItem('cart', JSON.stringify(cart));
          $('#cartCount').text(cart.length);
        });
      }
    });
  }
});
