let currentId = 0;

let movieList = [];

$(function () {
  $("#new-movie-form").on("submit", function (e) {
    e.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++;
    movieList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  });

  //delete
  $("tbody").on("click", ".btn.btn-danger", function (evt) {
    let indexToRemove = movieList.findIndex(
      (movie) => movie.currentId === +$(evt.target).data("deleteId")
    );

    movieList.splice(indexToRemove, 1);

    $(evt.target).closest("tr").remove();
  });

  $(".fas").on("click", function (event) {
    let direction = $(event.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(event.target).attr("id");
    let sortedMovie = sortBy(movieList, keyToSortBy, direction);

    $("#movie-table-body").empty();

    for (let movie of sortedMovie) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    $(event.target).toggleClass("fa-sort-down");
    $(event.target).toggleClass("fa-sort-up");
  });
});

//accepts array of objects and sorts by that key
function sortBy(array, keyToSortBy, direction) {
  return array.sort(function (a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

//createMovieDataHTML accepts an object and returns a string of HTML
function createMovieDataHTML(data) {
  return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
            <button class="btn btn-danger" data-delete-id=${data.currentId}>
            </button>Delete
        </td>
    </tr>
    `;
}
